# Security Considerations

This document outlines the security measures and best practices for Life Overview.

## Threat Model

### What We're Protecting

1. **Your personal data** - Notes, projects, documents in `/home/rick/life/`
2. **API credentials** - Anthropic API key
3. **Backup encryption keys** - Keys used to encrypt sensitive files

### What We're Protecting Against

1. **Unauthorized access** - Others accessing your backups
2. **Data exposure** - Accidentally committing secrets to public repos
3. **API key theft** - Protecting your Anthropic API key
4. **Data loss** - Ensuring backups are reliable and restorable

## Security Measures Implemented

### 1. Environment Variables

**What**: API keys and sensitive config stored in `.env`

**How it protects you**:
- `.env` is in `.gitignore` - never committed to git
- `.env` excluded from backups
- Only readable by your user account (file permissions)

**Your responsibility**:
- Never commit `.env` to any repository
- Keep a secure backup of `.env` separately (encrypted USB, password manager)
- Don't share your API key

### 2. Private Git Repository

**What**: Backups pushed to private GitHub/GitLab repo

**How it protects you**:
- Repository is private - only you have access
- GitHub/GitLab use encryption in transit (HTTPS/SSH)
- GitHub/GitLab encrypt data at rest

**Your responsibility**:
- Ensure repository is set to **Private**
- Use SSH keys (not passwords) for authentication
- Enable 2FA on your GitHub/GitLab account
- Review repository access periodically

### 3. Git-Crypt Encryption (Optional)

**What**: Sensitive files encrypted before commit

**Files encrypted by default**:
- `*.env`
- `*.key`
- `*.pem`
- `*.db`
- Anything in `credentials/` folder

**How it protects you**:
- Even if someone gains access to your git repo, encrypted files are unreadable
- Uses symmetric encryption with your key

**Your responsibility**:
- Keep your encryption key (`ENCRYPTION_KEY` in `.env`) secure
- Without this key, encrypted files cannot be decrypted
- Back up this key separately in a secure location

### 4. SSH Authentication

**What**: Using SSH keys instead of passwords for git

**How it protects you**:
- SSH keys are more secure than passwords
- Keys can be passphrase-protected
- Harder for attackers to steal/guess

**Your responsibility**:
- Use a passphrase on your SSH key
- Keep private key secure (`~/.ssh/id_ed25519`)
- Never share your private key

### 5. File System Permissions

**What**: Linux file permissions restrict access

**Default permissions**:
```bash
/home/rick/life/     - rwxr-x--- (750)
.env                 - rw------- (600)
backup-repo/.git/    - rwxr-x--- (750)
```

**How it protects you**:
- Only your user can read sensitive files
- Other users on system cannot access

**Your responsibility**:
- Don't change permissions to be more permissive
- Verify permissions: `ls -la .env`

## Best Practices

### API Key Security

1. **Never commit API keys**
   ```bash
   # Check before committing
   git diff | grep -i "sk-ant"
   ```

2. **Rotate keys if exposed**
   - Immediately revoke at https://console.anthropic.com/
   - Generate new key
   - Update `.env`

3. **Monitor API usage**
   - Check https://console.anthropic.com/ regularly
   - Watch for unusual activity

### Backup Security

1. **Verify repository is private**
   ```bash
   # On GitHub, you should see a "Private" badge on your repo
   ```

2. **Use SSH, not HTTPS**
   ```bash
   # Good
   GIT_REMOTE_URL=git@github.com:user/repo.git

   # Avoid (requires storing password)
   GIT_REMOTE_URL=https://github.com/user/repo.git
   ```

3. **Enable 2FA on git provider**
   - GitHub: Settings → Password and authentication → Two-factor authentication
   - GitLab: Preferences → Account → Two-Factor Authentication

4. **Review access logs**
   - GitHub: Settings → Security log
   - Check for unauthorized access attempts

### Encryption Key Management

1. **Generate strong keys**
   ```bash
   # Good - 32 bytes = 256 bits
   openssl rand -base64 32

   # Bad - weak password
   ENCRYPTION_KEY="password123"
   ```

2. **Store key securely**
   - Option 1: Password manager (1Password, Bitwarden, etc.)
   - Option 2: Encrypted USB drive
   - Option 3: Physical paper in safe
   - **Never**: Plain text file in Dropbox, Google Drive, etc.

3. **Test recovery**
   - Periodically test that you can decrypt with your key
   - Ensure you have access to key backup

## What's NOT Protected

### Data at Rest on Your Machine

Your `/home/rick/life/` folder is **not encrypted** by this system.

**Mitigation options**:
1. Enable full disk encryption (LUKS)
2. Encrypt home directory
3. Use encrypted containers (VeraCrypt)

### Data in Transit to Anthropic

API calls to Anthropic use HTTPS (encrypted), but:
- Anthropic receives your questions and file content
- Read Anthropic's privacy policy
- Don't send highly sensitive data if concerned

### SQLite Database

The index database (`data/life-index.db`) contains:
- File paths
- File content (for text files)
- Metadata

This is **not encrypted** on disk.

**Mitigation**:
- Database is excluded from backups
- Can be regenerated by re-indexing
- File permissions restrict access

## Incident Response

### If API Key is Exposed

1. **Immediately revoke** at https://console.anthropic.com/
2. Generate new key
3. Update `.env`
4. Check API usage for unauthorized activity
5. Review where exposure occurred

### If Encryption Key is Lost

1. You **cannot decrypt** encrypted files in backup
2. Re-generate key:
   ```bash
   openssl rand -base64 32
   ```
3. Update `.env`
4. Next backup will use new key
5. Old encrypted files are unrecoverable

### If Git Repository is Compromised

1. Check GitHub security log
2. Revoke access tokens
3. Change GitHub password
4. Enable 2FA if not already
5. Consider creating new repository
6. Rotate encryption key

### If Backup Contains Sensitive Data

1. Check what was committed:
   ```bash
   cd backup-repo
   git log --all --full-history -- "*password*"
   ```

2. If secrets found, **don't just delete** - they're in git history:
   ```bash
   # Use BFG Repo-Cleaner or git-filter-repo
   # Force push to rewrite history
   ```

3. Rotate any exposed credentials

## Regular Security Checklist

Monthly:

- [ ] Verify backup repository is still private
- [ ] Check GitHub/GitLab security logs
- [ ] Verify API key usage is expected
- [ ] Test backup restoration
- [ ] Verify `.env` file permissions

Quarterly:

- [ ] Rotate API key
- [ ] Verify encryption key backup is accessible
- [ ] Review GitHub/GitLab access tokens
- [ ] Check for unauthorized repository forks

Annually:

- [ ] Rotate encryption key
- [ ] Review all security settings
- [ ] Update SSH keys
- [ ] Audit file permissions

## Additional Security Measures (Optional)

### 1. Full Disk Encryption

Encrypt your entire system:

```bash
# Check if already enabled
lsblk -o NAME,FSTYPE,SIZE,MOUNTPOINT
# Look for "crypto_LUKS"
```

If not encrypted, consider Ubuntu's built-in disk encryption on next install.

### 2. Encrypted Home Directory

```bash
# Check current status
mount | grep ecryptfs
```

### 3. Separate Backup Encryption Key

Instead of storing encryption key in `.env`, use a separate encrypted file:

```bash
# Generate key file
openssl rand -base64 32 > ~/.backup-key

# Encrypt the key file
gpg -c ~/.backup-key

# Update backup script to decrypt key when needed
```

### 4. Hardware Security Key

Use YubiKey or similar for:
- SSH key storage
- GitHub/GitLab 2FA
- GPG encryption

### 5. Air-Gapped Backup

Periodically backup to:
- External USB drive (stored offline)
- Network-disconnected NAS
- Physical media (DVD)

## Questions?

### "Is my data safe?"

With the default configuration:
- ✅ API key is protected (not committed, not backed up)
- ✅ Backups are private (private repo, SSH auth)
- ✅ Sensitive files can be encrypted (git-crypt)
- ⚠️  Original data is not encrypted (Linux file permissions only)
- ⚠️  Database is not encrypted (permissions only)

### "Who can access my data?"

With default setup:
- You (with your credentials)
- GitHub/GitLab (encrypted at rest, in private repo)
- Anthropic (only data you query with)
- Root user on your machine
- Anyone with physical access to your machine (if disk not encrypted)

### "What if I lose my encryption key?"

You cannot recover encrypted files. This is by design - there's no "backdoor."

Always maintain a secure backup of your encryption key.

## Compliance

### GDPR Considerations

If your data includes EU personal data:
- You are the data controller
- Anthropic is a data processor
- Read Anthropic's DPA
- GitHub/GitLab are also data processors

### Data Residency

- Anthropic: US-based (data processed in US)
- GitHub: Global (check repository region settings)
- GitLab: Can choose region

## Responsible Disclosure

Found a security issue in Life Overview?

1. Don't post publicly
2. Contact via GitHub Issues (mark as security)
3. Provide details: steps to reproduce, impact
4. Allow reasonable time for fix

## Updates

Review this document when:
- Major version updates
- Security advisories announced
- Changing backup provider
- Adding new features

Last updated: 2024-11-08
