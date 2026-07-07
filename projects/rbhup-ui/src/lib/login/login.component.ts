import {
  Component, Input, Output, EventEmitter, OnInit, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface LoginFormValue {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginSocialProvider {
  id: string;
  label: string;
  icon: string;      // Font Awesome class
  color?: string;    // optional background color override
}

/**
 * rb-login  — Premium Login Page Component
 *
 * Variants: 'split' | 'card'
 * Supports: Social login, OTP/2FA step, remember me, dark mode, responsive
 *
 * @example
 * <rb-login
 *   variant="split"
 *   appName="My App"
 *   [socialProviders]="providers"
 *   (loginSubmit)="onLogin($event)"
 * ></rb-login>
 */
@Component({
  selector: 'rb-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="rb-login-host" [attr.data-variant]="variant">

      <!-- ── SPLIT LAYOUT ──────────────────────────────────── -->
      <div *ngIf="variant === 'split'" class="rb-login-split">
        <div class="rb-login-brand">
          <div class="rb-login-brand__inner">
            <ng-container *ngTemplateOutlet="logoTpl"></ng-container>
            <h1 class="rb-login-brand__title">{{ appName }}</h1>
            <p  class="rb-login-brand__desc">{{ brandDescription }}</p>
            <ul *ngIf="features.length" class="rb-login-brand__features">
              <li *ngFor="let f of features">
                <i [class]="f.icon || 'fa-solid fa-check-circle'"></i>
                <span>{{ f.text }}</span>
              </li>
            </ul>
          </div>
          <div class="rb-login-brand__blob rb-login-brand__blob--1"></div>
          <div class="rb-login-brand__blob rb-login-brand__blob--2"></div>
          <div class="rb-login-brand__blob rb-login-brand__blob--3"></div>
        </div>
        <div class="rb-login-form-panel">
          <ng-container *ngTemplateOutlet="formTpl"></ng-container>
        </div>
      </div>

      <!-- ── CARD (CENTER) LAYOUT ───────────────────────────── -->
      <div *ngIf="variant === 'card'" class="rb-login-card-bg">
        <div class="rb-login-card">
          <div class="rb-login-card__header">
            <ng-container *ngTemplateOutlet="logoTpl"></ng-container>
            <h2 class="rb-login-card__app-name">{{ appName }}</h2>
          </div>
          <ng-container *ngTemplateOutlet="formTpl"></ng-container>
        </div>
        <div class="rb-login-card-bg__shape rb-login-card-bg__shape--1"></div>
        <div class="rb-login-card-bg__shape rb-login-card-bg__shape--2"></div>
      </div>

    </div>

    <!-- ── LOGO TEMPLATE ─────────────────────────────────────── -->
    <ng-template #logoTpl>
      <ng-content select="[slot=logo]"></ng-content>
      <div *ngIf="!logoSrc" class="rb-login-brand__icon">
        <i [class]="brandIcon"></i>
      </div>
      <img *ngIf="logoSrc" [src]="logoSrc" [alt]="appName" class="rb-login-brand__logo-img" />
    </ng-template>

    <!-- ── SHARED FORM TEMPLATE ──────────────────────────────── -->
    <ng-template #formTpl>
      <div class="rb-login-form">

        <!-- ── STEP: Credentials ────────────────────────────── -->
        <ng-container *ngIf="step === 'credentials'">
          <div class="rb-login-form__heading">
            <h2 class="rb-login-form__title">{{ formTitle }}</h2>
            <p  class="rb-login-form__subtitle">{{ formSubtitle }}</p>
          </div>

          <div *ngIf="alertMessage" class="rb-login-form__alert" [attr.data-type]="alertType">
            <i [class]="alertType === 'error' ? 'fa-solid fa-triangle-exclamation' : 'fa-solid fa-circle-info'"></i>
            <span>{{ alertMessage }}</span>
          </div>

          <form class="rb-login-form__body" (ngSubmit)="handleSubmit()" novalidate>

            <!-- Username / Email -->
            <div class="rb-login-field">
              <label class="rb-login-field__label" [for]="'rb-u-' + instanceId">{{ usernameLabel }}</label>
              <div class="rb-login-field__wrap" [class.focused]="usernameFocused" [class.has-error]="usernameError">
                <i class="rb-login-field__icon" [class]="usernameIcon"></i>
                <input
                  [id]="'rb-u-' + instanceId"
                  class="rb-login-field__input"
                  [type]="usernameType"
                  [placeholder]="usernamePlaceholder"
                  [(ngModel)]="formValue.username"
                  name="username"
                  autocomplete="username"
                  (focus)="usernameFocused = true"
                  (blur)="onUsernameBlur()"
                  required
                />
              </div>
              <span *ngIf="usernameError" class="rb-login-field__error">
                <i class="fa-solid fa-circle-xmark"></i> {{ usernameError }}
              </span>
            </div>

            <!-- Password -->
            <div class="rb-login-field">
              <label class="rb-login-field__label" [for]="'rb-p-' + instanceId">{{ passwordLabel }}</label>
              <div class="rb-login-field__wrap" [class.focused]="passwordFocused" [class.has-error]="passwordError">
                <i class="rb-login-field__icon fa-solid fa-lock"></i>
                <input
                  [id]="'rb-p-' + instanceId"
                  class="rb-login-field__input"
                  [type]="showPassword ? 'text' : 'password'"
                  [placeholder]="passwordPlaceholder"
                  [(ngModel)]="formValue.password"
                  name="password"
                  autocomplete="current-password"
                  (focus)="passwordFocused = true"
                  (blur)="onPasswordBlur()"
                  (ngModelChange)="onPasswordChange($event)"
                  required
                />
                <button type="button" class="rb-login-field__eye" (click)="showPassword = !showPassword">
                  <i [class]="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                </button>
              </div>
              <span *ngIf="passwordError" class="rb-login-field__error">
                <i class="fa-solid fa-circle-xmark"></i> {{ passwordError }}
              </span>

              <!-- Password strength bar -->
              <div *ngIf="showPasswordStrength && formValue.password" class="rb-login-strength">
                <div class="rb-login-strength__bars">
                  <div *ngFor="let b of [1,2,3,4]"
                    class="rb-login-strength__bar"
                    [class.active]="passwordStrength >= b"
                    [attr.data-strength]="passwordStrength">
                  </div>
                </div>
                <span class="rb-login-strength__label" [attr.data-strength]="passwordStrength">
                  {{ strengthLabels[passwordStrength - 1] || '' }}
                </span>
              </div>
            </div>

            <!-- Remember me + Forgot password -->
            <div class="rb-login-form__options">
              <label *ngIf="showRememberMe" class="rb-login-remember">
                <input type="checkbox" class="rb-login-remember__input" [(ngModel)]="formValue.rememberMe" name="rememberMe" />
                <span class="rb-login-remember__box">
                  <i *ngIf="formValue.rememberMe" class="fa-solid fa-check"></i>
                </span>
                <span class="rb-login-remember__label">{{ rememberMeLabel }}</span>
              </label>
              <a *ngIf="showForgotPassword" class="rb-login-forgot" href="javascript:void(0)" (click)="forgotPasswordClick.emit()">
                {{ forgotPasswordLabel }}
              </a>
            </div>

            <!-- Submit -->
            <button type="submit" class="rb-login-submit" [class.loading]="loading" [disabled]="loading">
              <span *ngIf="!loading">
                <i [class]="submitIcon"></i> {{ submitLabel }}
              </span>
              <span *ngIf="loading" class="rb-login-submit__spinner">
                <i class="fa-solid fa-spinner fa-spin"></i> {{ loadingLabel }}
              </span>
            </button>

          </form>

          <!-- Social providers -->
          <div *ngIf="socialProviders.length" class="rb-login-social">
            <div class="rb-login-social__divider"><span>{{ socialDividerLabel }}</span></div>
            <div class="rb-login-social__buttons">
              <button *ngFor="let p of socialProviders" type="button"
                class="rb-login-social__btn"
                (click)="socialLoginClick.emit(p)">
                <i [class]="p.icon"></i>
                <span>{{ p.label }}</span>
              </button>
            </div>
          </div>

          <!-- Register link -->
          <p *ngIf="showRegisterLink" class="rb-login-register">
            {{ registerPromptLabel }}
            <a href="javascript:void(0)" (click)="registerClick.emit()">{{ registerLinkLabel }}</a>
          </p>

          <ng-content select="[slot=footer]"></ng-content>
        </ng-container>

        <!-- ── STEP: OTP / 2FA ───────────────────────────────── -->
        <ng-container *ngIf="step === 'otp'">
          <div class="rb-login-form__heading">
            <div class="rb-login-otp__back-row">
              <button class="rb-login-otp__back" type="button" (click)="step = 'credentials'">
                <i class="fa-solid fa-arrow-left"></i> Back
              </button>
            </div>
            <div class="rb-login-otp__icon">
              <i class="fa-solid fa-mobile-screen-button"></i>
            </div>
            <h2 class="rb-login-form__title">{{ otpTitle }}</h2>
            <p  class="rb-login-form__subtitle">{{ otpSubtitle }}</p>
          </div>

          <div *ngIf="alertMessage" class="rb-login-form__alert" [attr.data-type]="alertType">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>{{ alertMessage }}</span>
          </div>

          <!-- OTP digit inputs -->
          <div class="rb-login-otp">
            <div class="rb-login-otp__inputs">
              <input *ngFor="let d of otpDigits; let i = index"
                class="rb-login-otp__input"
                type="text"
                inputmode="numeric"
                maxlength="1"
                [(ngModel)]="otpDigits[i]"
                [name]="'otp-' + i"
                (input)="onOtpInput($event, i)"
                (keydown)="onOtpKeydown($event, i)"
                [id]="'rb-otp-' + instanceId + '-' + i"
              />
            </div>
            <p class="rb-login-otp__hint">
              {{ otpHint }}
              <a href="javascript:void(0)" (click)="resendOtp()">{{ otpResendLabel }}</a>
            </p>
          </div>

          <button class="rb-login-submit" [class.loading]="loading" [disabled]="loading || otpValue.length < otpLength"
            type="button" (click)="handleOtpSubmit()">
            <span *ngIf="!loading">
              <i class="fa-solid fa-shield-check"></i> {{ otpSubmitLabel }}
            </span>
            <span *ngIf="loading" class="rb-login-submit__spinner">
              <i class="fa-solid fa-spinner fa-spin"></i> {{ loadingLabel }}
            </span>
          </button>
        </ng-container>

      </div>
    </ng-template>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  // ─── Variant ────────────────────────────────────────────────────
  @Input() variant: 'split' | 'card' = 'split';

  // ─── Branding ───────────────────────────────────────────────────
  @Input() appName = 'RBHUP Enterprise';
  @Input() brandDescription = 'Unified enterprise management platform built for modern teams.';
  @Input() brandIcon = 'fa-solid fa-cubes';
  @Input() logoSrc = '';
  @Input() features: { icon?: string; text: string }[] = [
    { icon: 'fa-solid fa-shield-halved', text: 'Enterprise-grade security' },
    { icon: 'fa-solid fa-bolt',          text: 'Blazing fast performance' },
    { icon: 'fa-solid fa-layer-group',   text: 'Role-based access control' },
  ];

  // ─── Form labels ────────────────────────────────────────────────
  @Input() formTitle      = 'Welcome back';
  @Input() formSubtitle   = 'Sign in to your account to continue';
  @Input() usernameLabel  = 'Email address';
  @Input() usernameType   = 'email';
  @Input() usernameIcon   = 'fa-solid fa-envelope';
  @Input() usernamePlaceholder = 'you@company.com';
  @Input() passwordLabel  = 'Password';
  @Input() passwordPlaceholder = '••••••••';
  @Input() submitLabel    = 'Sign in';
  @Input() submitIcon     = 'fa-solid fa-right-to-bracket';
  @Input() loadingLabel   = 'Signing in…';
  @Input() rememberMeLabel = 'Remember me';
  @Input() forgotPasswordLabel = 'Forgot password?';
  @Input() registerPromptLabel = "Don't have an account?";
  @Input() registerLinkLabel   = 'Sign up';
  @Input() socialDividerLabel  = 'or continue with';

  // ─── Features ───────────────────────────────────────────────────
  @Input() showRememberMe     = true;
  @Input() showForgotPassword = true;
  @Input() showRegisterLink   = true;
  @Input() showPasswordStrength = false;

  // ─── State inputs ────────────────────────────────────────────────
  @Input() loading = false;
  @Input() alertMessage = '';
  @Input() alertType: 'error' | 'info' = 'error';

  // ─── Social providers ────────────────────────────────────────────
  @Input() socialProviders: LoginSocialProvider[] = [];

  // ─── OTP / 2FA ──────────────────────────────────────────────────
  @Input() otpLength = 6;
  @Input() otpTitle    = 'Two-Factor Authentication';
  @Input() otpSubtitle = 'Enter the verification code sent to your device';
  @Input() otpHint     = "Didn't receive a code?";
  @Input() otpResendLabel  = 'Resend';
  @Input() otpSubmitLabel  = 'Verify & Sign in';

  // ─── Events ─────────────────────────────────────────────────────
  @Output() loginSubmit         = new EventEmitter<LoginFormValue>();
  @Output() forgotPasswordClick = new EventEmitter<void>();
  @Output() registerClick       = new EventEmitter<void>();
  @Output() socialLoginClick    = new EventEmitter<LoginSocialProvider>();
  @Output() otpSubmit           = new EventEmitter<string>();
  @Output() otpResend           = new EventEmitter<void>();

  // ─── Internal state ─────────────────────────────────────────────
  step: 'credentials' | 'otp' = 'credentials';
  formValue: LoginFormValue = { username: '', password: '', rememberMe: false };
  showPassword    = false;
  usernameFocused = false;
  passwordFocused = false;
  usernameError   = '';
  passwordError   = '';
  hasLogoSlot     = false;
  instanceId      = Math.random().toString(36).slice(2, 8);
  passwordStrength = 0;
  otpDigits: string[] = [];
  strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  get otpValue(): string { return this.otpDigits.join(''); }

  ngOnInit() {
    this.otpDigits = Array(this.otpLength).fill('');
  }
  ngOnDestroy() {}

  /** Switch to OTP step programmatically */
  showOtpStep() { this.step = 'otp'; }

  handleSubmit() {
    this.usernameError = '';
    this.passwordError = '';
    let valid = true;
    if (!this.formValue.username.trim()) {
      this.usernameError = `${this.usernameLabel} is required`;
      valid = false;
    }
    if (!this.formValue.password) {
      this.passwordError = `${this.passwordLabel} is required`;
      valid = false;
    }
    if (!valid) return;
    this.loginSubmit.emit({ ...this.formValue });
  }

  handleOtpSubmit() {
    this.otpSubmit.emit(this.otpValue);
  }

  resendOtp() {
    this.otpDigits = Array(this.otpLength).fill('');
    this.otpResend.emit();
  }

  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const val = input.value.replace(/[^0-9]/g, '');
    this.otpDigits[index] = val.slice(-1);
    input.value = this.otpDigits[index];
    if (this.otpDigits[index] && index < this.otpLength - 1) {
      const next = document.getElementById(`rb-otp-${this.instanceId}-${index + 1}`);
      next?.focus();
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      this.otpDigits[index - 1] = '';
      const prev = document.getElementById(`rb-otp-${this.instanceId}-${index - 1}`);
      prev?.focus();
    }
  }

  onUsernameBlur() {
    this.usernameFocused = false;
    this.usernameError = !this.formValue.username.trim() ? `${this.usernameLabel} is required` : '';
  }

  onPasswordBlur() {
    this.passwordFocused = false;
    this.passwordError = !this.formValue.password ? `${this.passwordLabel} is required` : '';
  }

  onPasswordChange(val: string) {
    if (!this.showPasswordStrength) return;
    let score = 0;
    if (val.length >= 8)            score++;
    if (/[A-Z]/.test(val))          score++;
    if (/[0-9]/.test(val))          score++;
    if (/[^A-Za-z0-9]/.test(val))   score++;
    this.passwordStrength = score;
  }
}
