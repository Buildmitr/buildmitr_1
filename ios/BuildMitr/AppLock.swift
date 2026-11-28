import UIKit
import LocalAuthentication

/// Optional Face ID / Touch ID / passcode lock. Turned on in iPhone Settings → BuildMitr → "Lock with Face ID".
/// When on, the app is covered every time it goes to the background and unlocks with the owner's face, finger or passcode.
final class AppLock: NSObject {
    static let settingKey = "faceIdLock"
    private weak var host: UIViewController?
    private var cover: UIView?
    private var busy = false

    init(host: UIViewController) { self.host = host; super.init() }

    var isOn: Bool { UserDefaults.standard.bool(forKey: Self.settingKey) }

    func coverIfNeeded() {
        guard isOn, cover == nil, let v = host?.view else { return }
        let c = UIView(frame: v.bounds)
        c.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        c.backgroundColor = .systemBackground
        let stack = UIStackView()
        stack.axis = .vertical; stack.alignment = .center; stack.spacing = 16
        stack.translatesAutoresizingMaskIntoConstraints = false
        let icon = UIImageView(image: UIImage(systemName: "lock.fill"))
        icon.tintColor = UIColor(red: 0.12, green: 0.23, blue: 0.18, alpha: 1)
        icon.preferredSymbolConfiguration = UIImage.SymbolConfiguration(pointSize: 44)
        let title = UILabel(); title.text = "BuildMitr is locked"; title.font = .preferredFont(forTextStyle: .headline)
        let btn = UIButton(type: .system); btn.setTitle("Unlock", for: .normal)
        btn.titleLabel?.font = .preferredFont(forTextStyle: .body)
        btn.addTarget(self, action: #selector(unlockTapped), for: .touchUpInside)
        [icon, title, btn].forEach { stack.addArrangedSubview($0) }
        c.addSubview(stack)
        NSLayoutConstraint.activate([stack.centerXAnchor.constraint(equalTo: c.centerXAnchor),
                                     stack.centerYAnchor.constraint(equalTo: c.centerYAnchor)])
        v.addSubview(c)
        cover = c
    }

    @objc private func unlockTapped() { unlock() }

    func unlock() {
        guard cover != nil, !busy else { return }
        let ctx = LAContext()
        var err: NSError?
        // .deviceOwnerAuthentication = Face ID / Touch ID, falling back to the phone passcode
        guard ctx.canEvaluatePolicy(.deviceOwnerAuthentication, error: &err) else { removeCover(); return }   // no passcode set on the phone: nothing to check with
        busy = true
        ctx.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: "Unlock BuildMitr") { ok, _ in
            DispatchQueue.main.async {
                self.busy = false
                if ok { self.removeCover() }
            }
        }
    }

    private func removeCover() {
        UIView.animate(withDuration: 0.2, animations: { self.cover?.alpha = 0 }) { _ in
            self.cover?.removeFromSuperview(); self.cover = nil
        }
    }
}
