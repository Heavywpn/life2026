# Monitor your Microsoft 365 tenant's security configuration using Maester!

> [!info] GitHub - maester365/maester: The core repository for the Maester module with helper cmdlets that will be called from the Pester tests.  
> The core repository for the Maester module with helper cmdlets that will be called from the Pester tests.  
> [https://github.com/maester365/maester](https://github.com/maester365/maester)  

**Monitor your Microsoft 365 tenant's security configuration using Maester!**

Maester is an open source **PowerShell-based test automation framework** designed to help you monitor and maintain the security configuration of your Microsoft 365 environment.

To learn more about Maester and to get started, visit [Maester.dev](https://maester.dev/).

[![](https://camo.githubusercontent.com/2a248eea293ad4605de1d6aaeb84c28df1be33c0bd0338479e4cfb69db0a6743/68747470733a2f2f696d672e736869656c64732e696f2f706f7765727368656c6c67616c6c6572792f762f6d6165737465722e7376673f7374796c653d666c6174266c6f676f3d706f7765727368656c6c266c6162656c3d5072657669657725323056657273696f6e26696e636c7564655f70726572656c6561736573)](https://camo.githubusercontent.com/2a248eea293ad4605de1d6aaeb84c28df1be33c0bd0338479e4cfb69db0a6743/68747470733a2f2f696d672e736869656c64732e696f2f706f7765727368656c6c67616c6c6572792f762f6d6165737465722e7376673f7374796c653d666c6174266c6f676f3d706f7765727368656c6c266c6162656c3d5072657669657725323056657273696f6e26696e636c7564655f70726572656c6561736573)

[![](https://camo.githubusercontent.com/53417aecd87021fb827fb7e6aa9816eb526f9696b0d1a1d0881a69601b0165d8/68747470733a2f2f696d672e736869656c64732e696f2f706f7765727368656c6c67616c6c6572792f762f6d6165737465722e7376673f7374796c653d666c6174266c6f676f3d706f7765727368656c6c266c6162656c3d52656c6561736525323056657273696f6e)](https://camo.githubusercontent.com/53417aecd87021fb827fb7e6aa9816eb526f9696b0d1a1d0881a69601b0165d8/68747470733a2f2f696d672e736869656c64732e696f2f706f7765727368656c6c67616c6c6572792f762f6d6165737465722e7376673f7374796c653d666c6174266c6f676f3d706f7765727368656c6c266c6162656c3d52656c6561736525323056657273696f6e)

[![](https://camo.githubusercontent.com/8d0f98f9cbf1b9c037a7109fd39a1bd7d50ccd1cc592be9cd6766faa38bb4dd4/68747470733a2f2f696d672e736869656c64732e696f2f706f7765727368656c6c67616c6c6572792f64742f6d6165737465722e7376673f7374796c653d666c6174266c6f676f3d706f7765727368656c6c266c6162656c3d505347616c6c657279253230446f776e6c6f616473)](https://camo.githubusercontent.com/8d0f98f9cbf1b9c037a7109fd39a1bd7d50ccd1cc592be9cd6766faa38bb4dd4/68747470733a2f2f696d672e736869656c64732e696f2f706f7765727368656c6c67616c6c6572792f64742f6d6165737465722e7376673f7374796c653d666c6174266c6f676f3d706f7765727368656c6c266c6162656c3d505347616c6c657279253230446f776e6c6f616473)

[![](https://github.com/maester365/maester/actions/workflows/build-validation.yaml/badge.svg)](https://github.com/maester365/maester/actions/workflows/build-validation.yaml/badge.svg)

[![](https://github.com/maester365/maester/actions/workflows/publish-module-preview.yaml/badge.svg)](https://github.com/maester365/maester/actions/workflows/publish-module-preview.yaml/badge.svg)

**Key Features**

- **Automated Testing**: Maester provides a comprehensive set of automated tests to ensure the security of your Microsoft 365 setup.
- **Customizable**: Tailor Maester to your specific needs by adding custom Pester tests.
- **More to come...**

---

**Getting Started**

**Installation**

```Plain
Install-Module -Name Maester -Scope CurrentUser
```

**Installing Maester Tests**

To install the Maester tests run the following PowerShell commands. Pester will be installed if needed.

```Plain
md maester-tests
cd maester-tests
Install-MaesterTests
```

**Running Maester**

To run the tests in this folder run the following PowerShell commands. To learn more see [maester.dev](https://maester.dev/).

```Plain
Connect-Maester
Invoke-Maester
```

**Running Maester in a National Cloud Environment**

An optional parameter, `-Environment`, can be utilized on `Connect-Maester` to specify the name of the national cloud environment to connect to. By default global cloud is used.

Allowed values include:

- Global (default, if parameter is not specified)
- China
- Germany
- USGov
- USGovDOD

```Plain
Connect-Maester -Environment USGov
```

**Keeping your Maester tests up to date**

The Maester team will add new tests over time. To get the latest updates, use the commands below to update this folder with the latest tests.

- Update the `Maester` PowerShell module to the latest version and load it.
- Navigate to the folder where you have your Maester tests.
- Run `Update-MaesterTests`.

```Plain
Update-Module Maester -Force
Import-Module Maester
Update-MaesterTests
```

**Use as GitHub action**

Maester is also published to the [GitHub marketplace](https://github.com/marketplace/actions/maester-action) and can be used directly in any GitHub workflow.

Just provide the required client and tenant id. For more details please refer to the [docs](https://maester.dev/docs/monitoring/github/).

`name: Maester Daily Tests on: push: branches: ["main"] # Run once a day at midnight schedule: - cron: "0 0 * * *"# Allows to run this workflow manually from the Actions tab workflow_dispatch: permissions: id-token: write contents: read checks: write jobs: run-maester-tests: name: Run Maester Tests runs-on: ubuntu-latest steps: - name: Run Maester action uses: maester365/maester@main with: client-id: ${{ secrets.AZURE_CLIENT_ID }} tenant-id: ${{ secrets.AZURE_TENANT_ID }} include_public_tests: true # Optional pester_verbosity: None # Optional - 'None', 'Normal', 'Detailed', 'Diagnostic'`

---

# Office 365 MFA

### Comprehensive Guide: Phish-Resistant Multi-Factor Authentication (MFA) Setup in Microsoft 365

**Introduction**  
This guide outlines how to securely onboard new starters into your business using phish-resistant MFA within Microsoft 365. Phish-resistant MFA reduces the risk of password-based attacks and enhances overall security by eliminating the need for users to know their passwords, relying instead on more secure authentication methods.

This step-by-step guide will cover the following:

1. **Preparation: Migrating from Legacy MFA**
2. **Enabling Passkeys and Temporary Access Passwords (TAP)**
3. **Creating Authentication Strength**
4. **Setting Up a New User Account**
5. **Creating a Conditional Access Policy**
6. **Onboarding New Users: Downloading the Authenticator App and Configuring Devices**
7. **Configuring Windows Hello for Business**
8. **Final Thoughts**

### 1. Preparation: Migrating from Legacy MFA

Before implementing phish-resistant MFA, ensure your organization is migrated from legacy MFA to **Authentication Methods Policies**. This step is essential for enabling more secure authentication methods, such as passkeys and Windows Hello for Business. For detailed steps on how to migrate, refer to resources available on Microsoft’s documentation or video guides.

### 2. Enabling Passkeys and Temporary Access Passwords (TAP)

### Steps to Enable Passkeys:

1. Log in to Microsoft 365 Admin Center as a Global Administrator.
2. Navigate to **Admin Centers** > **Identity** > **Protection** > **Authentication Methods**.
3. Locate **Passkey (FIDO2)** and click on **Enable**.
4. Set the target to **All Users** (or specify a user group).
5. In the **Configure** tab, enable **Microsoft Authenticator Preview** for Android and iOS.
6. Click **Save**.

### Steps to Enable Temporary Access Passwords (TAP):

1. In the **Authentication Methods** page, find **Temporary Access Pass** and click **Enable**.
2. Set the target to **All Users**.
3. In the **Configure** tab, leave the default settings (1-hour lifetime, 8 characters) or adjust as needed.
4. Click **Update**, then **Save**.

### 3. Creating Authentication Strength

### Steps to Create Authentication Strength:

1. In the **Authentication Methods** page, go to **Authentication Strengths**.
2. Click **Create New Authentication Strength**.
3. Name it (e.g., "Company Auth Strength").
4. Choose **Windows Hello for Business**, **FIDO Passkeys**, **Certificate-Based Authentication**, **Temporary Access Pass (One-time use)**, and **Temporary Access Pass (Multi-use)**.
5. Click **Next**, then **Create**.

### 4. Setting Up a New User Account

### Steps to Add a New User:

1. Go to **Admin Center** > **Users** > **Active Users**.
2. Click **Add a New User**.
3. Fill in the user details (e.g., "Mini Mouse") and generate a random, strong password (you will not need to keep this).
4. Assign a **Premium License**.
5. Complete the setup and ignore the generated password, as this account will use passwordless methods.

### 5. Creating a Conditional Access Policy

### Steps to Create a Conditional Access Policy:

1. Go to **Admin Centers** > **Identity** > **Protection** > **Conditional Access**.
2. Click **Create New Policy**.
3. Name the policy (e.g., "Enforce Passkeys for M365 Apps").
4. Assign the policy to **User Groups** or **Individual Users** (e.g., Mini Mouse).
5. Set the target resources to **All Cloud Apps**.
6. Under **Grant**, select **Require Authentication Strength** and choose the one created earlier.
7. Set the policy **On**, then click **Create**.

### 6. Onboarding New Users: Downloading the Authenticator App and Configuring Devices

### Steps to Onboard a New User:

1. **New User Receives Their Device:**
    - New starters (e.g., Mini Mouse) should download the **Microsoft Authenticator App** on their mobile device.
    - The IT Admin creates a **Temporary Access Password (TAP)** for the new user:
        - Go to **Users** > **All Users** > Select the user (e.g., Mini Mouse).
        - Navigate to **Authentication Methods** > **Add Authentication Method** > **Temporary Access Pass**.
        - Provide the TAP to the user.
2. **User Logs In:**
    - The new user enters their Microsoft 365 email and the TAP.
    - The user registers the **Microsoft Authenticator App** by scanning the QR code or entering details manually.

### 7. Configuring Windows Hello for Business

### Steps to Configure Windows Hello for Business:

1. **Power On the Device:**
    - New starters boot up their Windows device and set it up for **Work or School**.
    - Enter the **Temporary Access Password** to log in.
2. **Configure Windows Hello:**
    - The setup will prompt for **Windows Hello** setup, where users can set up a PIN, fingerprint, or facial recognition.
    - Encourage the use of **Biometrics** for added security.
3. **Additional Configuration Options:**
    - Go to **Settings** > **Accounts** > **Sign-in Options** to adjust authentication methods (PIN, biometrics).

### 8. Final Thoughts

By following the steps outlined in this guide, you can onboard new starters securely into your organization using phish-resistant MFA. This setup eliminates the reliance on passwords, thus reducing the risk of phishing attacks. Phish-resistant MFA enhances security for Microsoft 365 apps and devices by using advanced authentication methods like **Windows Hello for Business** and **FIDO2 Passkeys**.

Remember, security is an ongoing process. Regularly review your conditional access policies and authentication methods to ensure robust protection against evolving threats.

---

# CIPP - Office 365 multi tenant management

[https://github.com/sponsors/KelvinTegelaar/sponsorships?email_opt_in=off&privacy_level=public&sponsor=Heavywpn&tier_id=101398](https://github.com/sponsors/KelvinTegelaar/sponsorships?email_opt_in=off&privacy_level=public&sponsor=Heavywpn&tier_id=101398)

> [!info] GitHub - KelvinTegelaar/CIPP: CIPP is a M365 multitenant management solution  
> CIPP is a M365 multitenant management solution.  
> [https://github.com/KelvinTegelaar/CIPP](https://github.com/KelvinTegelaar/CIPP)  

[https://cipp.app/](https://cipp.app/)