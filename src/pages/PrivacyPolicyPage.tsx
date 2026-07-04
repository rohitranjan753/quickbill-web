import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Zap } from 'lucide-react'

export function PrivacyPolicyPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface-low">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface-card/95 backdrop-blur-md border-b border-outline-variant">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-velocity-gradient rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-on-surface">QuickBill</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-surface-card rounded-2xl border border-outline-variant shadow-sm p-8 sm:p-12">

          {/* Title */}
          <div className="mb-10 pb-8 border-b border-outline-variant">
            <h1 className="text-3xl sm:text-4xl font-bold text-on-surface mb-3">Privacy Policy</h1>
            <p className="text-sm text-on-surface-variant">Last updated: 4 July 2026 &nbsp;·&nbsp; Effective date: 4 July 2026</p>
          </div>

          <div className="space-y-10 text-on-surface-variant leading-relaxed">

            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-3">1. About This Policy</h2>
              <p className="text-sm">
                QuickBill ("the App") is operated by <strong className="text-on-surface font-semibold">TechHive</strong> ("we", "us", "our"). This Privacy Policy explains what personal data we collect when you use QuickBill, why we collect it, how we use and protect it, and your rights as a data principal under the <strong className="text-on-surface font-semibold">Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the <strong className="text-on-surface font-semibold">Information Technology Act, 2000</strong>.
              </p>
              <p className="text-sm mt-3">
                By installing or using QuickBill, you agree to the practices described in this Policy. If you do not agree, please uninstall the App and discontinue use.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">2. Who We Are</h2>
              <Table>
                <tbody>
                  <TR><TD label>Company</TD><TD>TechHive</TD></TR>
                  <TR><TD label>App</TD><TD>QuickBill — Self-Checkout &amp; Smart Billing</TD></TR>
                  <TR><TD label>Contact</TD><TD><a href="mailto:privacy@techhive.in" className="text-primary hover:underline">privacy@techhive.in</a></TD></TR>
                  <TR><TD label>Grievance Officer</TD><TD><a href="mailto:grievance@techhive.in" className="text-primary hover:underline">grievance@techhive.in</a></TD></TR>
                </tbody>
              </Table>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">3. Data We Collect</h2>

              <SubSection title="3.1 Account & Identity">
                <Table>
                  <THead cols={['Data', 'How we get it', 'Why']} />
                  <tbody>
                    <TR><TD>Full name</TD><TD>Google Sign-In / profile setup</TD><TD>Display in-app; receipts</TD></TR>
                    <TR><TD>Email address</TD><TD>Google Sign-In</TD><TD>Account identification; receipts</TD></TR>
                    <TR><TD>Phone number</TD><TD>OTP login</TD><TD>Account verification</TD></TR>
                    <TR><TD>Profile photo</TD><TD>Google Sign-In (optional)</TD><TD>In-app display only</TD></TR>
                    <TR><TD>User role</TD><TD>You select on first login</TD><TD>Route you to the correct app mode (Customer / Store Admin / Guard)</TD></TR>
                  </tbody>
                </Table>
              </SubSection>

              <SubSection title="3.2 Location">
                <Table>
                  <THead cols={['Data', 'How we get it', 'Why']} />
                  <tbody>
                    <TR><TD>Precise GPS location</TD><TD>Device GPS (with your permission)</TD><TD>Show nearby stores; validate you are inside a store</TD></TR>
                  </tbody>
                </Table>
                <p className="text-sm mt-3">Location is only read while the App is open and a store is being selected. We do <strong className="text-on-surface font-semibold">not</strong> track your location in the background.</p>
              </SubSection>

              <SubSection title="3.3 Camera & Scanning">
                <p className="text-sm mb-2">The App uses your camera to:</p>
                <ul className="list-disc list-inside text-sm space-y-1 ml-1">
                  <li>Scan product barcodes while shopping</li>
                  <li>Scan store QR codes to start a session</li>
                  <li>Scan customer receipt QR codes (Guard mode)</li>
                </ul>
                <p className="text-sm mt-3">Camera frames are processed <strong className="text-on-surface font-semibold">on-device</strong> and are never uploaded to our servers.</p>
              </SubSection>

              <SubSection title="3.4 Shopping & Transaction Data">
                <Table>
                  <THead cols={['Data', 'Details']} />
                  <tbody>
                    <TR><TD>Cart contents</TD><TD>Products added, quantities, prices</TD></TR>
                    <TR><TD>Order / receipt records</TD><TD>Items purchased, total amount, timestamp, store</TD></TR>
                    <TR><TD>Payment status</TD><TD>Success / failure / pending; Razorpay order ID and payment ID</TD></TR>
                  </tbody>
                </Table>
                <p className="text-sm mt-3">We do <strong className="text-on-surface font-semibold">not</strong> store card numbers, CVVs, UPI PINs, or any raw payment credentials. All payment processing is handled by Razorpay (see Section 6).</p>
              </SubSection>

              <SubSection title="3.5 Guard & Attendance Data (Guard role only)">
                <Table>
                  <THead cols={['Data', 'Details']} />
                  <tbody>
                    <TR><TD>Check-in / check-out times</TD><TD>Shift start and end timestamps</TD></TR>
                    <TR><TD>Verified receipt records</TD><TD>Which receipts the guard scanned and their outcome</TD></TR>
                    <TR><TD>Flagged transaction records</TD><TD>Notes entered when a transaction is flagged</TD></TR>
                  </tbody>
                </Table>
              </SubSection>

              <SubSection title="3.6 Device & Technical Data">
                <Table>
                  <THead cols={['Data', 'Details']} />
                  <tbody>
                    <TR><TD>Device model &amp; OS version</TD><TD>Crash diagnostics</TD></TR>
                    <TR><TD>App version</TD><TD>Support and debugging</TD></TR>
                    <TR><TD>Firebase Installation ID</TD><TD>Push notifications (if enabled)</TD></TR>
                  </tbody>
                </Table>
                <p className="text-sm mt-3">We do <strong className="text-on-surface font-semibold">not</strong> collect advertising IDs (GAID/IDFA) or sell device data to third parties.</p>
              </SubSection>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">4. Legal Basis for Processing</h2>
              <p className="text-sm mb-4">Under the DPDP Act 2023 we process your personal data on the following grounds:</p>
              <Table>
                <THead cols={['Purpose', 'Basis']} />
                <tbody>
                  <TR><TD>Account creation &amp; authentication</TD><TD><strong className="text-on-surface font-semibold">Consent</strong> — you explicitly sign in</TD></TR>
                  <TR><TD>Processing your order and payment</TD><TD><strong className="text-on-surface font-semibold">Legitimate use</strong> — performance of contract</TD></TR>
                  <TR><TD>Location for store discovery</TD><TD><strong className="text-on-surface font-semibold">Consent</strong> — permission dialog on first use</TD></TR>
                  <TR><TD>Camera for scanning</TD><TD><strong className="text-on-surface font-semibold">Consent</strong> — permission dialog on first use</TD></TR>
                  <TR><TD>Fraud prevention and security</TD><TD><strong className="text-on-surface font-semibold">Legitimate use</strong> — protecting users and the platform</TD></TR>
                  <TR><TD>Compliance with law</TD><TD><strong className="text-on-surface font-semibold">Legal obligation</strong></TD></TR>
                </tbody>
              </Table>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">5. How We Use Your Data</h2>
              <ul className="list-disc list-inside text-sm space-y-2 ml-1">
                <li>Authenticate you and maintain your session</li>
                <li>Process orders, generate receipts, and confirm payments</li>
                <li>Show nearby stores based on your location</li>
                <li>Allow guards to verify customer receipts at store exit</li>
                <li>Track guard attendance for store administrators</li>
                <li>Send transactional notifications (order confirmation, payment status)</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Improve the App (aggregated, anonymised analytics only)</li>
                <li>Respond to support requests and legal obligations</li>
              </ul>
              <p className="text-sm mt-4">We do <strong className="text-on-surface font-semibold">not</strong> use your data for advertising profiling or sell it to third-party marketers.</p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">6. Third-Party Services</h2>
              <p className="text-sm mb-4">We share limited data with the following processors only to the extent necessary to operate the App:</p>
              <Table>
                <THead cols={['Service', 'Provider', 'Data shared', 'Purpose']} />
                <tbody>
                  <TR><TD>Firebase Authentication</TD><TD>Google LLC</TD><TD>Email, phone, name</TD><TD>Sign-in</TD></TR>
                  <TR><TD>Cloud Firestore</TD><TD>Google LLC</TD><TD>User profile, orders, receipts, attendance</TD><TD>Primary database</TD></TR>
                  <TR><TD>Supabase</TD><TD>Supabase Inc.</TD><TD>User profile, store &amp; product data</TD><TD>Backend API</TD></TR>
                  <TR><TD>Razorpay</TD><TD>Razorpay Software Pvt. Ltd.</TD><TD>Order amount, contact details</TD><TD>Payment processing</TD></TR>
                  <TR><TD>Google Sign-In</TD><TD>Google LLC</TD><TD>OAuth token</TD><TD>Social login</TD></TR>
                </tbody>
              </Table>
              <p className="text-sm mt-3">All third-party providers are contractually bound to process your data only on our instructions. Refer to their individual privacy policies for details on their own data practices.</p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">7. Data Storage &amp; Retention</h2>
              <ul className="list-disc list-inside text-sm space-y-2 ml-1">
                <li>Data is stored in <strong className="text-on-surface font-semibold">Google Firebase</strong> and <strong className="text-on-surface font-semibold">Supabase</strong> servers. Firebase infrastructure is globally distributed; Supabase data is hosted in the region selected at project setup (currently <strong className="text-on-surface font-semibold">ap-south-1, Mumbai</strong>).</li>
                <li>We retain your account and order data for <strong className="text-on-surface font-semibold">3 years</strong> from your last active use, or as required by applicable Indian tax and accounting laws.</li>
                <li>Attendance records are retained for <strong className="text-on-surface font-semibold">1 year</strong>.</li>
                <li>You may request deletion at any time (see Section 9).</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">8. Data Security</h2>
              <ul className="list-disc list-inside text-sm space-y-2 ml-1">
                <li>All data in transit is encrypted using TLS 1.2+.</li>
                <li>Supabase Row-Level Security (RLS) policies ensure users can only access their own data.</li>
                <li>Payment flows use Razorpay's PCI-DSS compliant infrastructure.</li>
                <li>QR receipt tokens are JWT-signed and expire within <strong className="text-on-surface font-semibold">30 minutes</strong>.</li>
                <li>We conduct periodic security reviews of our backend configuration.</li>
              </ul>
              <p className="text-sm mt-4">Despite these measures, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security.</p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">9. Your Rights (DPDP Act 2023)</h2>
              <p className="text-sm mb-4">As a data principal you have the right to:</p>
              <Table>
                <THead cols={['Right', 'What it means']} />
                <tbody>
                  <TR><TD><strong className="text-on-surface font-semibold">Access</strong></TD><TD>Request a summary of personal data we hold about you</TD></TR>
                  <TR><TD><strong className="text-on-surface font-semibold">Correction</strong></TD><TD>Ask us to correct inaccurate or incomplete data</TD></TR>
                  <TR><TD><strong className="text-on-surface font-semibold">Erasure</strong></TD><TD>Request deletion of your account and personal data</TD></TR>
                  <TR><TD><strong className="text-on-surface font-semibold">Grievance redressal</strong></TD><TD>Lodge a complaint with our Grievance Officer</TD></TR>
                  <TR><TD><strong className="text-on-surface font-semibold">Nominee</strong></TD><TD>Designate a nominee to exercise rights on your behalf</TD></TR>
                </tbody>
              </Table>
              <p className="text-sm mt-4">
                To exercise any right, email <a href="mailto:privacy@techhive.in" className="text-primary hover:underline font-medium">privacy@techhive.in</a> with the subject line <code className="bg-surface-low px-1.5 py-0.5 rounded text-xs font-mono text-on-surface">Data Request — QuickBill</code>. We will respond within <strong className="text-on-surface font-semibold">30 days</strong>.
              </p>
              <p className="text-sm mt-3">
                If your grievance is not resolved within 30 days, you may escalate to the <strong className="text-on-surface font-semibold">Data Protection Board of India</strong> once the Board becomes operational under the DPDP Act.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-3">10. Children's Privacy</h2>
              <p className="text-sm">
                QuickBill is not directed at children under the age of 18. We do not knowingly collect personal data from anyone under 18. If you believe a minor has provided us personal data, contact us at <a href="mailto:privacy@techhive.in" className="text-primary hover:underline">privacy@techhive.in</a> and we will delete it promptly.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">11. Permissions Summary</h2>
              <Table>
                <THead cols={['Permission', 'Used for', 'Can you deny it?']} />
                <tbody>
                  <TR>
                    <TD><code className="bg-surface-low px-1.5 py-0.5 rounded text-xs font-mono text-on-surface">CAMERA</code></TD>
                    <TD>Barcode &amp; QR scanning</TD>
                    <TD>Yes — scanning will not work</TD>
                  </TR>
                  <TR>
                    <TD><code className="bg-surface-low px-1.5 py-0.5 rounded text-xs font-mono text-on-surface">ACCESS_FINE_LOCATION</code></TD>
                    <TD>Nearby store discovery</TD>
                    <TD>Yes — you can enter store ID manually</TD>
                  </TR>
                  <TR>
                    <TD><code className="bg-surface-low px-1.5 py-0.5 rounded text-xs font-mono text-on-surface">ACCESS_COARSE_LOCATION</code></TD>
                    <TD>Nearby store discovery (fallback)</TD>
                    <TD>Yes</TD>
                  </TR>
                  <TR>
                    <TD><code className="bg-surface-low px-1.5 py-0.5 rounded text-xs font-mono text-on-surface">INTERNET</code></TD>
                    <TD>API calls, payments</TD>
                    <TD>Required — app will not function</TD>
                  </TR>
                  <TR>
                    <TD><code className="bg-surface-low px-1.5 py-0.5 rounded text-xs font-mono text-on-surface">ACCESS_NETWORK_STATE</code></TD>
                    <TD>Offline detection</TD>
                    <TD>Required</TD>
                  </TR>
                  <TR>
                    <TD><code className="bg-surface-low px-1.5 py-0.5 rounded text-xs font-mono text-on-surface">VIBRATE</code></TD>
                    <TD>Haptic feedback on successful scan</TD>
                    <TD>Yes</TD>
                  </TR>
                </tbody>
              </Table>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-3">12. Changes to This Policy</h2>
              <p className="text-sm mb-3">We may update this Policy from time to time. When we do, we will:</p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-1">
                <li>Update the "Last updated" date at the top of this document</li>
                <li>Show an in-app notice for material changes</li>
              </ul>
              <p className="text-sm mt-3">Continued use of the App after the effective date constitutes acceptance of the updated Policy.</p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-3">13. Contact</h2>
              <p className="text-sm mb-3">For data requests, privacy questions, or complaints:</p>
              <div className="bg-surface-low rounded-xl border border-outline-variant p-5 text-sm">
                <p className="font-semibold text-on-surface mb-1">TechHive — Privacy Team</p>
                <p>Email: <a href="mailto:rohit.techhive@gmail.com" className="text-primary hover:underline">rohit.techhive@gmail.com</a></p>
              </div>
            </section>

          </div>

          {/* Footer note */}
          <div className="mt-12 pt-8 border-t border-outline-variant">
            <p className="text-xs text-on-surface-variant/60 text-center">
              This Privacy Policy is governed by the laws of India. Any disputes arising from this Policy shall be subject to the jurisdiction of courts in India.
            </p>
          </div>

        </div>
      </main>

      {/* Page footer */}
      <footer className="bg-on-surface text-white py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} QuickBill. All rights reserved.</p>
          <p className="text-white/40 text-xs">Built with <span className="text-tertiary">♥</span> in India</p>
        </div>
      </footer>
    </div>
  )
}

/* ---- Tiny helper components for table styling ---- */

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-outline-variant">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  )
}

function THead({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr className="bg-surface-low">
        {cols.map((col) => (
          <th key={col} className="text-left px-4 py-3 text-xs font-semibold text-on-surface-variant uppercase tracking-wide border-b border-outline-variant">
            {col}
          </th>
        ))}
      </tr>
    </thead>
  )
}

function TR({ children }: { children: React.ReactNode }) {
  return <tr className="border-b border-outline-variant last:border-0 hover:bg-surface-low/50 transition-colors">{children}</tr>
}

function TD({ children, label }: { children: React.ReactNode; label?: boolean }) {
  return (
    <td className={`px-4 py-3 align-top text-sm ${label ? 'font-medium text-on-surface whitespace-nowrap w-40' : 'text-on-surface-variant'}`}>
      {children}
    </td>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold text-on-surface mb-3">{title}</h3>
      {children}
    </div>
  )
}
