const PasswordGenerator = {
    generate(length, options) {
        const { useNumbers, useLowercase, useUppercase, useSpecialChars } = options;
        let chars = '';
        
        if (useNumbers) chars += '0123456789';
        if (useLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useSpecialChars) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (!chars) return '';
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return password;
    },

    generate6Digit() {
        return this.generate(6, {
            useNumbers: true,
            useLowercase: false,
            useUppercase: false,
            useSpecialChars: false
        });
    },

    generate12Simple() {
        return this.generate(12, {
            useNumbers: true,
            useLowercase: true,
            useUppercase: true,
            useSpecialChars: false
        });
    },

    generate12Complex() {
        return this.generate(12, {
            useNumbers: true,
            useLowercase: true,
            useUppercase: true,
            useSpecialChars: true
        });
    },

    generate18() {
        return this.generate(18, {
            useNumbers: true,
            useLowercase: true,
            useUppercase: true,
            useSpecialChars: true
        });
    }
};

const UI = {
    elements: {},
    currentPasswordType: null,

    init() {
        this.elements = {
            passwordDisplay: document.getElementById('password-display'),
            generate6DigitsBtn: document.getElementById('generate-6digits'),
            generate12SimpleBtn: document.getElementById('generate-12simple'),
            generate12ComplexBtn: document.getElementById('generate-12complex'),
            generate18Btn: document.getElementById('generate-18'),
            copyBtn: document.getElementById('copy-password'),
            regenerateBtn: document.getElementById('regenerate'),
            warningMessage: document.getElementById('warning-message'),
            toast: document.getElementById('toast')
        };

        this.validateElements();
        this.attachEventListeners();
    },

    validateElements() {
        for (const [key, element] of Object.entries(this.elements)) {
            if (!element) {
                console.error(`Element ${key} not found`);
            }
        }
    },

    attachEventListeners() {
        this.elements.generate6DigitsBtn.addEventListener('click', () => {
            this.generatePassword('6digit');
        });

        this.elements.generate12SimpleBtn.addEventListener('click', () => {
            this.generatePassword('12simple');
        });

        this.elements.generate12ComplexBtn.addEventListener('click', () => {
            this.generatePassword('12complex');
        });

        this.elements.generate18Btn.addEventListener('click', () => {
            this.generatePassword('18');
        });

        this.elements.copyBtn.addEventListener('click', () => {
            this.copyPassword();
        });

        this.elements.regenerateBtn.addEventListener('click', () => {
            this.regeneratePassword();
        });
    },

    generatePassword(type) {
        let password = '';
        let warningType = '';

        switch (type) {
            case '6digit':
                password = PasswordGenerator.generate6Digit();
                warningType = 'weak';
                break;
            case '12simple':
                password = PasswordGenerator.generate12Simple();
                warningType = 'medium';
                break;
            case '12complex':
                password = PasswordGenerator.generate12Complex();
                warningType = 'strong';
                break;
            case '18':
                password = PasswordGenerator.generate18();
                warningType = 'veryStrong';
                break;
        }

        this.currentPasswordType = type;
        this.displayPassword(password);
        this.showWarning(warningType);
        this.enableActionButtons();
    },

    displayPassword(password) {
        this.elements.passwordDisplay.textContent = password;
        this.elements.passwordDisplay.classList.add('has-password');
    },

    showWarning(type) {
        const messages = {
            weak: '⚠️ 警告：6位数字密码安全性较低，建议仅在非重要场合使用',
            medium: 'ℹ️ 提示：12位简单密码适合一般安全要求的场合',
            strong: '✓ 提示：12位复杂密码安全性较高，适合重要账户',
            veryStrong: '✓ 提示：18位密码安全性极高，建议用于重要账户'
        };

        const warningElement = this.elements.warningMessage;
        warningElement.textContent = messages[type] || '';
        warningElement.className = 'warning show';

        if (type === 'weak') {
            warningElement.classList.add('warning-weak');
        } else {
            warningElement.classList.add('warning-normal');
        }
    },

    enableActionButtons() {
        this.elements.copyBtn.disabled = false;
        this.elements.regenerateBtn.disabled = false;
    },

    async copyPassword() {
        const password = this.elements.passwordDisplay.textContent;
        
        if (!password || password === '点击上方按钮生成密码') {
            return;
        }

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(password);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = password;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    document.execCommand('copy');
                } catch (err) {
                    console.error('复制失败:', err);
                    alert('复制失败，请手动复制密码');
                    return;
                } finally {
                    textArea.remove();
                }
            }
            
            this.showToast('✓ 密码已复制到剪贴板');
        } catch (err) {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制密码');
        }
    },

    regeneratePassword() {
        if (this.currentPasswordType) {
            this.generatePassword(this.currentPasswordType);
        }
    },

    showToast(message) {
        const toast = this.elements.toast;
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    UI.init();
});
