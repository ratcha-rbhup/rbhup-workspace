import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginComponent, LoginFormValue, LoginSocialProvider } from '../../../../../dist/rbhup-ui';

@Component({
  selector: 'app-login-demo',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  template: `
    <!-- Full-screen split login -->
    <rb-login
      *ngIf="variant === 'split'"
      variant="split"
      appName="RBHUP Enterprise"
      brandDescription="ระบบบริหารจัดการองค์กรยุคใหม่ ครบวงจร ปลอดภัย รวดเร็ว"
      [features]="features"
      [loading]="loading"
      [alertMessage]="errorMsg"
      alertType="error"
      [socialProviders]="socialProviders"
      formTitle="ยินดีต้อนรับ"
      formSubtitle="กรุณาลงชื่อเข้าใช้งานระบบของคุณ"
      usernameLabel="อีเมล"
      usernamePlaceholder="กรอกอีเมลของคุณ"
      passwordLabel="รหัสผ่าน"
      passwordPlaceholder="••••••••"
      submitLabel="เข้าสู่ระบบ"
      rememberMeLabel="จดจำการเข้าสู่ระบบ"
      forgotPasswordLabel="ลืมรหัสผ่าน?"
      registerPromptLabel="ยังไม่มีบัญชี?"
      registerLinkLabel="สมัครสมาชิก"
      socialDividerLabel="หรือเข้าสู่ระบบด้วย"
      (loginSubmit)="onLogin($event)"
      (forgotPasswordClick)="onForgot()"
      (registerClick)="onRegister()"
      (socialLoginClick)="onSocial($event)"
    ></rb-login>

    <!-- Full-screen card login -->
    <rb-login
      *ngIf="variant === 'card'"
      variant="card"
      appName="RBHUP Enterprise"
      [loading]="loading"
      [alertMessage]="errorMsg"
      alertType="error"
      [socialProviders]="socialProviders"
      (loginSubmit)="onLogin($event)"
      (forgotPasswordClick)="onForgot()"
      (registerClick)="onRegister()"
      (socialLoginClick)="onSocial($event)"
    ></rb-login>

    <!-- Floating switcher bar -->
    <div class="demo-switcher">
      <span class="demo-switcher__label">Variant:</span>
      <button (click)="variant = 'split'" [class.active]="variant === 'split'">
        <i class="fa-solid fa-table-columns"></i> Split
      </button>
      <button (click)="variant = 'card'" [class.active]="variant === 'card'">
        <i class="fa-solid fa-id-card"></i> Card
      </button>
      <div class="demo-switcher__sep"></div>
      <button (click)="goToStorybook()" title="Back to Storybook">
        <i class="fa-solid fa-arrow-left"></i> Storybook
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      position: relative;
    }
    rb-login {
      display: block;
      width: 100%;
      height: 100%;
    }
    .demo-switcher {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 100px;
      padding: 8px 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.35);
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      white-space: nowrap;

      &__label {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        color: rgba(255,255,255,0.45);
        letter-spacing: 0.08em;
        margin-right: 4px;
      }

      button {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 12px;
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 100px;
        background: transparent;
        color: rgba(255,255,255,0.7);
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.2s ease;

        &:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border-color: rgba(255,255,255,0.3);
        }

        &.active {
          background: var(--primary, #3b82f6);
          border-color: transparent;
          color: #fff;
        }
      }

      &__sep {
        width: 1px;
        height: 16px;
        background: rgba(255,255,255,0.15);
        margin: 0 4px;
      }
    }
  `]
})
export class LoginDemoComponent {
  variant: 'split' | 'card' = 'split';
  loading = false;
  errorMsg = '';

  features = [
    { icon: 'fa-solid fa-shield-halved',  text: 'ระบบความปลอดภัยระดับองค์กร' },
    { icon: 'fa-solid fa-bolt',           text: 'ประมวลผลรวดเร็ว ตอบสนองทันที' },
    { icon: 'fa-solid fa-layer-group',    text: 'สิทธิ์การใช้งานตามบทบาท (RBAC)' },
    { icon: 'fa-solid fa-chart-pie',      text: 'รายงานและ Dashboard แบบเรียลไทม์' },
  ];

  socialProviders: LoginSocialProvider[] = [
    { id: 'google',    label: 'Google',    icon: 'fa-brands fa-google' },
    { id: 'microsoft', label: 'Microsoft', icon: 'fa-brands fa-microsoft' },
    { id: 'github',    label: 'GitHub',    icon: 'fa-brands fa-github' },
  ];

  constructor(private router: Router) {}

  onLogin(val: LoginFormValue) {
    this.loading = true;
    this.errorMsg = '';
    // Simulate API call
    setTimeout(() => {
      this.loading = false;
      if (val.username !== 'admin@rbhup.co.th') {
        this.errorMsg = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง';
      } else {
        alert(`เข้าสู่ระบบสำเร็จ!\nผู้ใช้: ${val.username}`);
      }
    }, 1800);
  }

  onForgot() {
    alert('ระบบจะส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลของคุณ');
  }

  onRegister() {
    alert('Redirect ไปยังหน้าสมัครสมาชิก');
  }

  onSocial(provider: LoginSocialProvider) {
    alert(`เข้าสู่ระบบด้วย ${provider.label}`);
  }

  goToStorybook() {
    this.router.navigate(['/']);
  }
}
