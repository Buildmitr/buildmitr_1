import UIKit
import WebKit
import SafariServices

/// BuildMitr for iPhone and iPad: the live BuildMitr site in a full-screen web view, plus the phone features
/// the site needs — camera and photo uploads, saving and sharing files, printing / PDF, location, Face ID lock,
/// pull to refresh and an offline screen. Every website deploy reaches the app at once (no App Store update needed).
final class WebViewController: UIViewController, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler, WKDownloadDelegate {

    static let home = URL(string: "https://buildmitr.github.io/buildmitr_1/?src=ios")!
    static let appHost = "buildmitr.github.io"
    static let brand = UIColor(red: 0x1f / 255, green: 0x3a / 255, blue: 0x2e / 255, alpha: 1)

    private(set) var webView: WKWebView!
    private var lock: AppLock!
    private var offlineView: UIView?
    private var downloadFiles: [ObjectIdentifier: URL] = [:]
    private var lastExternal: (url: String, at: Date)?

    // MARK: - set-up

    override func loadView() {
        let ucc = WKUserContentController()
        ucc.addUserScript(WKUserScript(source: Self.bootJS, injectionTime: .atDocumentStart, forMainFrameOnly: false))
        ucc.add(WeakHandler(self), name: "bm")

        let cfg = WKWebViewConfiguration()
        cfg.userContentController = ucc
        cfg.limitsNavigationsToAppBoundDomains = true       // needed for the site's offline copy (service worker) inside an app
        cfg.allowsInlineMediaPlayback = true
        cfg.mediaTypesRequiringUserActionForPlayback = []
        cfg.applicationNameForUserAgent = "BuildMitrApp-iOS/" + (Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "1")
        cfg.defaultWebpagePreferences.preferredContentMode = .mobile

        let wv = WKWebView(frame: .zero, configuration: cfg)
        wv.navigationDelegate = self
        wv.uiDelegate = self
        wv.allowsBackForwardNavigationGestures = true
        wv.allowsLinkPreview = false
        wv.isOpaque = false
        wv.backgroundColor = .systemBackground
        wv.scrollView.contentInsetAdjustmentBehavior = .automatic
        if #available(iOS 16.4, *) { wv.isInspectable = false }

        let refresh = UIRefreshControl()
        refresh.addTarget(self, action: #selector(pulledToRefresh(_:)), for: .valueChanged)
        wv.scrollView.refreshControl = refresh

        webView = wv
        let root = UIView()
        root.backgroundColor = .systemBackground
        wv.translatesAutoresizingMaskIntoConstraints = false
        root.addSubview(wv)
        NSLayoutConstraint.activate([
            wv.topAnchor.constraint(equalTo: root.safeAreaLayoutGuide.topAnchor),
            wv.bottomAnchor.constraint(equalTo: root.bottomAnchor),
            wv.leadingAnchor.constraint(equalTo: root.leadingAnchor),
            wv.trailingAnchor.constraint(equalTo: root.trailingAnchor),
        ])
        view = root
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        lock = AppLock(host: self)
        let nc = NotificationCenter.default
        nc.addObserver(self, selector: #selector(didEnterBackground), name: UIApplication.didEnterBackgroundNotification, object: nil)
        nc.addObserver(self, selector: #selector(didBecomeActive), name: UIApplication.didBecomeActiveNotification, object: nil)
        lock.coverIfNeeded()
        webView.load(URLRequest(url: Self.home))
    }

    override var preferredStatusBarStyle: UIStatusBarStyle { .default }

    func open(_ url: URL) {
        if url.host == Self.appHost { webView.load(URLRequest(url: url)) } else { openOutside(url) }
    }

    @objc private func didEnterBackground() { lock.coverIfNeeded() }
    @objc private func didBecomeActive() { lock.unlock() }

    @objc private func pulledToRefresh(_ rc: UIRefreshControl) {
        if webView.url == nil { webView.load(URLRequest(url: Self.home)) } else { webView.reload() }
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.8) { rc.endRefreshing() }
    }

    // MARK: - where links go: BuildMitr pages stay in the app, everything else opens outside

    private func isAppPage(_ url: URL) -> Bool {
        guard let s = url.scheme?.lowercased() else { return false }
        if ["about", "blob", "data", "javascript"].contains(s) { return true }
        return (s == "https" || s == "http") && url.host?.lowercased() == Self.appHost
    }

    private func openOutside(_ url: URL) {
        let key = url.absoluteString
        if let l = lastExternal, l.url == key, Date().timeIntervalSince(l.at) < 2 { return }   // the site may try twice (new window, then same window)
        lastExternal = (key, Date())
        let s = url.scheme?.lowercased() ?? ""
        let host = url.host?.lowercased() ?? ""
        let appLinks = ["wa.me", "api.whatsapp.com", "t.me", "maps.google.com", "www.google.com", "maps.apple.com"]
        if (s == "http" || s == "https") && !appLinks.contains(host) {
            let sf = SFSafariViewController(url: url)
            sf.preferredControlTintColor = Self.brand
            present(sf, animated: true)
        } else {
            UIApplication.shared.open(url, options: [:]) { ok in
                if !ok, s == "https" || s == "http" { DispatchQueue.main.async { self.present(SFSafariViewController(url: url), animated: true) } }
            }
        }
    }

    func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                 preferences: WKWebpagePreferences,
                 decisionHandler: @escaping (WKNavigationActionPolicy, WKWebpagePreferences) -> Void) {
        guard let url = action.request.url else { decisionHandler(.cancel, preferences); return }
        if action.shouldPerformDownload { decisionHandler(.download, preferences); return }
        let mainFrame = action.targetFrame?.isMainFrame ?? true
        if isAppPage(url) || !mainFrame {
            decisionHandler(.allow, preferences)
        } else {
            decisionHandler(.cancel, preferences)
            openOutside(url)
        }
    }

    func webView(_ webView: WKWebView, decidePolicyFor response: WKNavigationResponse,
                 decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void) {
        let r = response.response as? HTTPURLResponse
        let disp = (r?.value(forHTTPHeaderField: "Content-Disposition") ?? "").lowercased()
        if !response.canShowMIMEType || disp.hasPrefix("attachment") { decisionHandler(.download) } else { decisionHandler(.allow) }
    }

    // window.open(…) / target=_blank
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                 for action: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = action.request.url, let s = url.scheme?.lowercased(), !["about", "blob", "data", "javascript"].contains(s) {
            if isAppPage(url) { webView.load(action.request) } else { openOutside(url) }
        }
        return nil
    }

    // MARK: - loading and the offline screen

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) { hideOffline() }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        let e = error as NSError
        if e.domain == NSURLErrorDomain && e.code == NSURLErrorCancelled { return }
        if e.domain == "WebKitErrorDomain" && (e.code == 102 || e.code == 101) { return }   // handed to a download / another app
        if webView.url == nil || webView.url?.host != Self.appHost || !webView.canGoBack { showOffline() }
    }

    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        if webView.url == nil { webView.load(URLRequest(url: Self.home)) } else { webView.reload() }
    }

    private func showOffline() {
        guard offlineView == nil else { return }
        let v = UIView(frame: view.bounds)
        v.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        v.backgroundColor = .systemBackground
        let stack = UIStackView()
        stack.axis = .vertical; stack.alignment = .center; stack.spacing = 14
        stack.translatesAutoresizingMaskIntoConstraints = false
        let img = UIImageView(image: UIImage(systemName: "wifi.slash"))
        img.tintColor = Self.brand
        img.preferredSymbolConfiguration = UIImage.SymbolConfiguration(pointSize: 44)
        let t = UILabel(); t.text = "No internet connection"; t.font = .preferredFont(forTextStyle: .headline)
        let s = UILabel(); s.text = "BuildMitr needs the internet the first time it opens.\nCheck Wi-Fi or mobile data and try again."
        s.numberOfLines = 0; s.textAlignment = .center; s.textColor = .secondaryLabel; s.font = .preferredFont(forTextStyle: .subheadline)
        let b = UIButton(type: .system); b.setTitle("Try again", for: .normal)
        b.titleLabel?.font = .preferredFont(forTextStyle: .body)
        b.addTarget(self, action: #selector(retry), for: .touchUpInside)
        [img, t, s, b].forEach { stack.addArrangedSubview($0) }
        v.addSubview(stack)
        NSLayoutConstraint.activate([
            stack.centerXAnchor.constraint(equalTo: v.centerXAnchor),
            stack.centerYAnchor.constraint(equalTo: v.centerYAnchor),
            stack.leadingAnchor.constraint(greaterThanOrEqualTo: v.leadingAnchor, constant: 24),
        ])
        view.insertSubview(v, aboveSubview: webView)   // stays under the Face ID lock cover
        offlineView = v
    }

    private func hideOffline() { offlineView?.removeFromSuperview(); offlineView = nil }

    @objc private func retry() { hideOffline(); webView.load(URLRequest(url: webView.url?.host == Self.appHost ? webView.url! : Self.home)) }

    // MARK: - alert / confirm / prompt from the site

    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let a = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        a.addAction(UIAlertAction(title: "OK", style: .default) { _ in completionHandler() })
        presentAlert(a) { completionHandler() }
    }

    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        let a = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        a.addAction(UIAlertAction(title: "Cancel", style: .cancel) { _ in completionHandler(false) })
        a.addAction(UIAlertAction(title: "OK", style: .default) { _ in completionHandler(true) })
        presentAlert(a) { completionHandler(false) }
    }

    func webView(_ webView: WKWebView, runJavaScriptTextInputPanelWithPrompt prompt: String, defaultText: String?,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (String?) -> Void) {
        let a = UIAlertController(title: nil, message: prompt, preferredStyle: .alert)
        a.addTextField { $0.text = defaultText }
        a.addAction(UIAlertAction(title: "Cancel", style: .cancel) { _ in completionHandler(nil) })
        a.addAction(UIAlertAction(title: "OK", style: .default) { _ in completionHandler(a.textFields?.first?.text) })
        presentAlert(a) { completionHandler(nil) }
    }

    /// shows an alert on top of whatever is open; if nothing can show it, answers at once so the page never hangs
    private func presentAlert(_ a: UIAlertController, fallback: @escaping () -> Void) {
        var top: UIViewController = self
        while let p = top.presentedViewController { top = p }
        if top.viewIfLoaded?.window == nil || top.isBeingPresented || top.isBeingDismissed || top is UIAlertController {
            fallback(); return
        }
        top.present(a, animated: true)
        if a.presentingViewController == nil { fallback() }   // could not be shown: answer so the page never hangs
    }

    // MARK: - camera / microphone for QR scan and meeting recording (only for BuildMitr pages)

    @available(iOS 15.0, *)
    func webView(_ webView: WKWebView, requestMediaCapturePermissionFor origin: WKSecurityOrigin, initiatedByFrame frame: WKFrameInfo,
                 type: WKMediaCaptureType, decisionHandler: @escaping (WKPermissionDecision) -> Void) {
        decisionHandler(origin.host == Self.appHost ? .prompt : .deny)
    }

    // MARK: - files the site saves (Excel, PDF, backups): saved, then the share sheet opens (Save to Files, WhatsApp, Mail …)

    func webView(_ webView: WKWebView, navigationAction: WKNavigationAction, didBecome download: WKDownload) { download.delegate = self }
    func webView(_ webView: WKWebView, navigationResponse: WKNavigationResponse, didBecome download: WKDownload) { download.delegate = self }

    func download(_ download: WKDownload, decideDestinationUsing response: URLResponse, suggestedFilename: String,
                  completionHandler: @escaping (URL?) -> Void) {
        let dir = FileManager.default.temporaryDirectory.appendingPathComponent("downloads-" + UUID().uuidString, isDirectory: true)
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        var name = suggestedFilename.replacingOccurrences(of: "/", with: "-")
        if name.isEmpty { name = "BuildMitr file" }
        let dest = dir.appendingPathComponent(name)
        downloadFiles[ObjectIdentifier(download)] = dest
        completionHandler(dest)
    }

    func downloadDidFinish(_ download: WKDownload) {
        guard let file = downloadFiles.removeValue(forKey: ObjectIdentifier(download)) else { return }
        share(items: [file], completion: nil)
    }

    func download(_ download: WKDownload, didFailWithError error: Error, resumeData: Data?) {
        downloadFiles.removeValue(forKey: ObjectIdentifier(download))
        toast("Could not save the file. Please try again.")
    }

    private func share(items: [Any], completion: ((Bool) -> Void)?) {
        let vc = UIActivityViewController(activityItems: items, applicationActivities: nil)
        vc.completionWithItemsHandler = { _, done, _, _ in completion?(done) }
        if let pop = vc.popoverPresentationController {   // iPad
            pop.sourceView = view
            pop.sourceRect = CGRect(x: view.bounds.midX, y: view.bounds.midY, width: 1, height: 1)
            pop.permittedArrowDirections = []
        }
        var top: UIViewController = self
        while let p = top.presentedViewController { top = p }
        if top.isBeingPresented || top.isBeingDismissed || top.viewIfLoaded?.window == nil { completion?(false); return }
        top.present(vc, animated: true)
        if vc.presentingViewController == nil { completion?(false) }
    }

    private func toast(_ text: String) {
        let js = "try{toast(\(Self.jsString(text)))}catch(e){}"
        webView.evaluateJavaScript(js, completionHandler: nil)
    }

    // MARK: - messages from the page (print, share)

    func userContentController(_ ucc: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let m = message.body as? [String: Any], let t = m["t"] as? String else { return }
        switch t {
        case "print":
            printHTML(m["html"] as? String ?? "", title: m["title"] as? String ?? "BuildMitr")
        case "share":
            let id = m["id"] as? String ?? ""
            var items: [Any] = []
            let text = [m["text"] as? String, m["url"] as? String].compactMap { $0 }.filter { !$0.isEmpty }.joined(separator: "\n")
            if !text.isEmpty { items.append(text) }
            let dir = FileManager.default.temporaryDirectory.appendingPathComponent("share-" + UUID().uuidString, isDirectory: true)
            try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
            for f in (m["files"] as? [[String: Any]] ?? []) {
                guard let b64 = f["data"] as? String, let data = Data(base64Encoded: b64) else { continue }
                var name = (f["name"] as? String ?? "file").replacingOccurrences(of: "/", with: "-")
                if name.isEmpty { name = "file" }
                let u = dir.appendingPathComponent(name)
                if (try? data.write(to: u)) != nil { items.append(u) }
            }
            if items.isEmpty { webView.evaluateJavaScript("window.__bmShareDone&&__bmShareDone(\(Self.jsString(id)),false)", completionHandler: nil); return }
            share(items: items) { done in
                self.webView.evaluateJavaScript("window.__bmShareDone&&__bmShareDone(\(Self.jsString(id)),\(done))", completionHandler: nil)
            }
        default: break
        }
    }

    private func printHTML(_ html: String, title: String) {
        let pc = UIPrintInteractionController.shared
        let info = UIPrintInfo(dictionary: nil)
        info.outputType = .general
        info.jobName = title
        pc.printInfo = info
        pc.printFormatter = html.isEmpty ? webView.viewPrintFormatter() : UIMarkupTextPrintFormatter(markupText: html)
        if UIDevice.current.userInterfaceIdiom == .pad {
            pc.present(from: CGRect(x: view.bounds.midX, y: 80, width: 1, height: 1), in: view, animated: true, completionHandler: nil)
        } else {
            pc.present(animated: true, completionHandler: nil)
        }
    }

    static func jsString(_ s: String) -> String {
        let d = (try? JSONSerialization.data(withJSONObject: [s])) ?? Data("[\"\"]".utf8)
        let a = String(data: d, encoding: .utf8) ?? "[\"\"]"
        return String(a.dropFirst().dropLast())
    }

    // MARK: - script added to every BuildMitr page

    static let bootJS = """
    (function(){
      if(window.__bmIOS)return;window.__bmIOS=1;
      var post=function(m){try{window.webkit.messageHandlers.bm.postMessage(m);}catch(e){}};
      /* the site treats the app as installed (no "get the app" boxes) */
      try{Object.defineProperty(Navigator.prototype,'standalone',{configurable:true,get:function(){return true;}});}catch(e){}
      /* Google does not allow its sign-in inside apps on iPhone: the app signs in with email + password or an email code */
      try{var cfg;Object.defineProperty(window,'BM_CONFIG',{configurable:true,get:function(){return cfg;},set:function(v){if(v&&typeof v==='object')v.googleClientId='';cfg=v;}});}catch(e){}
      /* print (the site prints from a hidden frame) → the iPhone print sheet, which also saves as PDF */
      var pr=function(w){return function(){var d;try{d=w.document;}catch(e){}post({t:'print',html:d&&d.documentElement?d.documentElement.outerHTML:'',title:(d&&d.title)||document.title||'BuildMitr'});};};
      window.print=function(){post({t:'print',html:'',title:document.title||'BuildMitr'});};
      try{var cw=Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype,'contentWindow');
        Object.defineProperty(HTMLIFrameElement.prototype,'contentWindow',{configurable:true,get:function(){var w=cw.get.call(this);try{if(w&&!w.__bmP){w.__bmP=1;w.print=pr(w);}}catch(e){}return w;}});}catch(e){}
      /* share → the iPhone share sheet (text, links and files such as PDFs) */
      var cbs={},n=0;
      window.__bmShareDone=function(id,ok){var c=cbs[id];if(!c)return;delete cbs[id];if(ok)c[0]();else{var er;try{er=new DOMException('Share canceled','AbortError');}catch(e){er=new Error('AbortError');}c[1](er);}};
      var rd=function(f){return new Promise(function(res){var r=new FileReader();r.onload=function(){res({name:f.name||'file',type:f.type||'',data:String(r.result).split(',')[1]||''});};r.onerror=function(){res(null);};r.readAsDataURL(f);});};
      try{navigator.share=function(d){d=d||{};return new Promise(function(res,rej){var id='s'+(++n);cbs[id]=[res,rej];
        Promise.all((d.files||[]).map(rd)).then(function(fs){post({t:'share',id:id,title:d.title||'',text:d.text||'',url:d.url||'',files:fs.filter(Boolean)});});});};
        navigator.canShare=function(d){return true;};}catch(e){}
    })();
    """
}

/// keeps the page's message channel from holding on to the screen (avoids a memory leak)
private final class WeakHandler: NSObject, WKScriptMessageHandler {
    weak var target: WKScriptMessageHandler?
    init(_ t: WKScriptMessageHandler) { target = t }
    func userContentController(_ c: WKUserContentController, didReceive m: WKScriptMessage) { target?.userContentController(c, didReceive: m) }
}
