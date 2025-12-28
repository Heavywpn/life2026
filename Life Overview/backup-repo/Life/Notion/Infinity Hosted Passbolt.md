---
Root details: ricky.prout   zX9#mK2$pL7@vF4&qR6*nH8^bT3!cY5
---
[https://www.linode.com/marketplace/apps/passbolt/passbolt/](https://www.linode.com/marketplace/apps/passbolt/passbolt/)

### **Deploying a Marketplace App**

The Linode Marketplace allows you to easily deploy software on a Compute Instance using the Cloud Manager. See [Get Started with Marketplace Apps](https://www.linode.com/docs/products/tools/marketplace/get-started/) for complete steps.

1. Log in to the [Cloud Manager](https://cloud.linode.com/) and select the **Marketplace** link from the left navigation menu. This displays the Linode **Create** page with the **Marketplace** tab pre-selected.
2. Under the **Select App** section, select the app you would like to deploy.
3. Complete the form by following the steps and advice within the [Creating a Compute Instance](https://www.linode.com/docs/guides/creating-a-compute-instance/) guide. Depending on the Marketplace App you selected, there may be additional configuration options available. See the [Configuration Options](https://www.linode.com/docs/products/tools/marketplace/guides/hashicorp-vault/#configuration-options) section below for compatible distributions, recommended plans, and any additional configuration options available for this Marketplace App.
4. Click the **Create Linode** button. Once the Compute Instance has been provisioned and has fully powered on, **wait for the software installation to complete**. If the instance is powered off or restarted before this time, the software installation will likely fail.
5. To verify that the app has been fully installed, see [Get Started with Marketplace Apps > Verify Installation](https://www.linode.com/docs/products/tools/marketplace/get-started/#verify-installation). Once installed, follow the instructions within the [Getting Started After Deployment](https://www.linode.com/docs/products/tools/marketplace/guides/mastodon/#getting-started-after-deployment) section to access the application and start using it.

To verify that the app has been fully installed, see [Get Started with Marketplace Apps > Verify Installation](https://www.linode.com/docs/products/tools/marketplace/get-started/#verify-installation). Once installed, follow the instructions within the [Getting Started After Deployment](https://deploy-preview-6683--nostalgic-ptolemy-b01ab8.netlify.app/docs/products/tools/marketplace/guides/mainconcept-xdcam-transcoder/#getting-started-after-deployment) section to access the application and start using it.

**Estimated Deployment Time:** Passbolt CE should be fully installed within 5-10 minutes after the Compute Instance has finished provisioning.

### **Configuration Options**

- **Supported distributions:** Ubuntu 22.04 LTS
- **Recommended plan:** For best results, 4GB Dedicated CPU or Shared Compute instance for Passbolt CE.

### **Passbolt CE Options**

You need to fill out the following fields to automatically create a limited sudo user, with a strong generated password for your new Compute Instance. This account will be assigned to the _sudo_ group, which provides elevated permissions when running commands with the `sudo` prefix.

- **Limited sudo user:** Enter your preferred username for the limited user. _No Capital Letters, Spaces, or Special CharactersLocating The Generated Sudo Password_A password is generated for the limited user and stored in a `.credentials` file in their home directory, along with application specific passwords. This can be viewed by running: `cat /home/$USERNAME/.credentials`For best results, add an account SSH key for the Cloud Manager user that is deploying the instance, and select that user as an `authorized_user` in the API or by selecting that option in the Cloud Manager. Their SSH pubkey will be assigned to both root and the limited user.
- **Disable root access over SSH:** To block the root user from logging in over SSH, select _Yes_. You can still switch to the root user once logged in, and you can also log in as root through [Lish](https://www.linode.com/docs/products/compute/compute-instances/guides/lish/)._Accessing The Instance Without SSH_If you disable root access for your deployment and do not provide a valid Account SSH Key assigned to the `authorized_user`, you will need to login as the root user via the [Lish console](https://www.linode.com/docs/products/compute/compute-instances/guides/lish/) and run `cat /home/$USERNAME/.credentials` to view the generated password for the limited user.

### **Getting Started After Deployment**

To start registration follow the link provided in `/etc/motd` to visit the DNS you choose during deployment.

```Plain
cat /etc/motd
*********************************************************
Akamai Connected Cloud passbolt Marketplace App

Registering admin user: https://$DNS_NAME/setup/start/$UUID

App URL: https://$DNS_NAME
Credentials File: /home/$SUDO_USER/.credentials
Documentation: https://www.linode.com/marketplace/apps/linode/passbolt/
*********************************************************
To delete this message of the day: rm /etc/motd
```

Be sure to download the `passbolt-recovery-kit.txt` file and store it in a safe place. This PGP Private Key Block (and the passphrase you set here) will be required if you ever need to go through account recovery.

You will need to create a passphrase to access Passbolt CE.

[![](https://www.linode.com/wp-content/uploads/2024/03/passbolt_login-1004x1064.jpg)](https://www.linode.com/wp-content/uploads/2024/03/passbolt_login-1004x1064.jpg)

Once the passphrase is set you will be able to view the Passbolt CE main screen.

[![](https://www.linode.com/wp-content/uploads/2024/03/passbolt_mainscreen-1064x463.jpg)](https://www.linode.com/wp-content/uploads/2024/03/passbolt_mainscreen-1064x463.jpg)

For more information, visit [Passbolt CE Installation Documentation](https://help.passbolt.com/hosting/install/ce/ubuntu/ubuntu.html) for details on how to configure Passbolt.

### **Email Configuration**

Postfix is installed as part of the Marketplace App, allowing you to send a test email. Unless you’ve manually configured your own SMTP provider, to send a test email through the SMTP screen (https://<example.com>/app/administration/smtp-settings), use the following (replace `example.com` with your FQDN):

- **Email provider**: Other
- **Authentication method**: None
- **SMTP host**: localhost
- **Use TLS?**: No
- **Port**: 25
- **SMTP client** leave blank
- **Sender name**: root
- **Sender email**: root@<example.com>

_Note:_ To make the most out of Passbolt CE you need a working email setup for email notifications (e.g. – account registration, password recovery and other critical notifications). For more information on setting this up, see the [Configure Email Providers](https://help.passbolt.com/configure/email/setup) page on Passbolt’s website.

Regardless of how you configure your mail server, we suggest that you follow the best practices to ensure mail deliverability. For more information, see the [Running a Mail Server](https://www.linode.com/docs/guides/running-a-mail-server/) guide.

### **Email Configuration**

If you ever need to recover your account, you will be prompted for the PGP private key block you downloaded after entering your passphrase for the first time.

_The Passbolt CE app available on Marketplace was built for Linode by NATS. For support regarding app deployment, contact **[Linode Support](https://www.linode.com/support/)**._ _For support regarding the tool or software itself, use the information in the sidebar_.

**Please Note**

_Passbolt and the Passbolt logo are registered trademarks of Passbolt S.A._ _This service is provided by Akamai and is not affiliated with Passbolt S.A._