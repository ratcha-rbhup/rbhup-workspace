import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { SelectComponent, SelectOption } from '../select/select.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { RadioComponent, RadioOption } from '../radio/radio.component';
import { ToggleComponent } from '../toggle/toggle.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { TabsComponent, TabItem } from '../tabs/tabs.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogOutletComponent } from '../dialog/dialog-outlet.component';
import { DialogService } from '../dialog/dialog.service';
import { DrawerComponent } from '../drawer/drawer.component';
import { SideFormComponent } from '../side-form/side-form.component';
import { CardFormComponent } from '../card-form/card-form.component';
import { AlertComponent } from '../alert/alert.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { OverlayLoadingComponent } from '../overlay-loading/overlay-loading.component';
import { ToastComponent } from '../toast/toast.component';
import { ToastService } from '../toast/toast.service';
import { TableComponent, TableColumn } from '../table/table.component';
import { AccordionComponent } from '../accordion/accordion.component';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { StepperComponent, StepItem } from '../stepper/stepper.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MetricCardComponent } from '../metric-card/metric-card.component';
import { BadgeComponent } from '../badge/badge.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { TimelineComponent, TimelineItem } from '../timeline/timeline.component';
import { EmptyComponent } from '../empty/empty.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent, SidebarItem } from '../sidebar/sidebar.component';
import { LoginComponent, LoginSocialProvider } from '../login/login.component';

@Component({
  selector: 'lib-storybook',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    ButtonComponent, InputComponent, TextareaComponent, SelectComponent,
    CheckboxComponent, RadioComponent, ToggleComponent, CalendarComponent,
    TabsComponent, DialogComponent, DialogOutletComponent, DrawerComponent,
    SideFormComponent, CardFormComponent, AlertComponent, SkeletonComponent,
    ProgressBarComponent, OverlayLoadingComponent, ToastComponent,
    TableComponent, AccordionComponent, TooltipComponent,
    StepperComponent, FileUploadComponent, MetricCardComponent,
    BadgeComponent, AvatarComponent, TimelineComponent, EmptyComponent,
    SidebarComponent, LoginComponent
  ],

  template: `
    <div class="rb-storybook font-sans p-6 bg-page min-h-screen text-main">
      <rb-toast></rb-toast>
      <rb-dialog-outlet></rb-dialog-outlet>

      <!-- Overlay Loading (demo) -->
      <rb-overlay-loading [visible]="isLoading" message="กำลังโหลดข้อมูล..."></rb-overlay-loading>

      <!-- Header -->
      <header class="flex justify-between items-center mb-6 pb-4 border-b flex-wrap gap-3">
        <div>
          <h1 class="text-3xl font-extrabold text-primary m-0 flex items-center gap-2">
            <i class="fa-solid fa-cubes"></i> RBHUP UI Storybook
          </h1>
          <p class="text-sm text-muted mt-1 m-0">Interactive visual catalog · {{ allComponents }} premium components ready</p>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-xs font-semibold text-muted select-none">THEME:</span>
          <button (click)="setTheme('')" class="theme-dot default" [class.active]="activeTheme === ''" title="Dark Blue"></button>
          <button (click)="setTheme('theme-orange')" class="theme-dot orange" [class.active]="activeTheme === 'theme-orange'" title="Orange"></button>
          <button (click)="setTheme('theme-som')" class="theme-dot som" [class.active]="activeTheme === 'theme-som'" title="Som (Original Orange)"></button>
          <button (click)="setTheme('theme-green')" class="theme-dot green" [class.active]="activeTheme === 'theme-green'" title="Green"></button>
          <button (click)="setTheme('theme-blue')" class="theme-dot blue" [class.active]="activeTheme === 'theme-blue'" title="Blue"></button>
          <button (click)="setTheme('theme-sky')" class="theme-dot sky" [class.active]="activeTheme === 'theme-sky'" title="Sky"></button>
          <button (click)="setTheme('theme-indigo')" class="theme-dot indigo" [class.active]="activeTheme === 'theme-indigo'" title="Indigo"></button>
          <button (click)="setTheme('theme-lime')" class="theme-dot lime" [class.active]="activeTheme === 'theme-lime'" title="Lime"></button>
          <button (click)="setTheme('theme-amber')" class="theme-dot amber" [class.active]="activeTheme === 'theme-amber'" title="Amber"></button>
          <button (click)="setTheme('theme-yellow')" class="theme-dot yellow" [class.active]="activeTheme === 'theme-yellow'" title="Yellow"></button>
          <button (click)="setTheme('theme-purple')" class="theme-dot purple" [class.active]="activeTheme === 'theme-purple'" title="Purple"></button>
          <button (click)="setTheme('theme-fuchsia')" class="theme-dot fuchsia" [class.active]="activeTheme === 'theme-fuchsia'" title="Fuchsia"></button>
          <button (click)="setTheme('theme-cyan')" class="theme-dot cyan" [class.active]="activeTheme === 'theme-cyan'" title="Cyan"></button>
          <button (click)="setTheme('theme-teal')" class="theme-dot teal" [class.active]="activeTheme === 'theme-teal'" title="Teal"></button>
          <button (click)="setTheme('theme-rose')" class="theme-dot rose" [class.active]="activeTheme === 'theme-rose'" title="Rose"></button>
          <button (click)="setTheme('theme-slate')" class="theme-dot slate" [class.active]="activeTheme === 'theme-slate'" title="Slate"></button>

          <div class="border-l pl-2 ml-1">
            <button (click)="toggleDarkMode()" class="dark-mode-toggle flex items-center gap-1.5" [class.active]="isDarkMode">
              <i *ngIf="!isDarkMode" class="fa-solid fa-moon"></i>
              <i *ngIf="isDarkMode" class="fa-solid fa-sun"></i>
              <span>{{ isDarkMode ? 'Light' : 'Dark' }}</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Navigation Tabs -->
      <nav class="flex gap-1 mb-6 overflow-x-auto pb-2 border-b flex-nowrap">
        <button *ngFor="let tab of mainTabs" (click)="activeTab = tab.id"
          class="tab-btn flex items-center gap-2" [class.active]="activeTab === tab.id">
          <i [class]="tab.icon"></i>
          <span>{{ tab.label }}</span>
        </button>
      </nav>

      <main class="animate-slide-up">

        <!-- ====== COLORS ====== -->
        <section *ngIf="activeTab === 'colors'" class="animate-fade-in">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fa-solid fa-palette text-primary"></i> Curated Color Shades
          </h2>
          <div class="grid-layout mb-6">
            <div class="card" *ngFor="let p of palettes">
              <h3 class="text-xs font-bold capitalize mb-3 text-primary">{{ p.name }}</h3>
              <div class="flex flex-col gap-1">
                <div *ngFor="let s of shades"
                  class="flex items-center justify-between px-2 py-1 rounded-xs text-xs font-mono"
                  [style.background-color]="'var(--rb-' + p.name + '-' + s + ')'"
                  [style.color]="s > 400 ? '#fff' : '#000'">
                  <span>{{ p.name }}-{{ s }}</span>
                </div>
              </div>
            </div>
          </div>
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fa-solid fa-circle-exclamation text-primary"></i> Semantic Alerts
          </h2>
          <div class="grid-layout-3">
            <rb-alert type="success" title="Success Alert" message="Operation completed successfully!" [dismissible]="false"></rb-alert>
            <rb-alert type="danger" title="Error Alert" message="Something went wrong. Please try again." [dismissible]="false"></rb-alert>
            <rb-alert type="warning" title="Warning Alert" message="Disk space is running low." [dismissible]="false"></rb-alert>
            <rb-alert type="info" title="Information Alert" message="New update is available for download." [dismissible]="false"></rb-alert>
          </div>
        </section>

        <!-- ====== FORMS ====== -->
        <section *ngIf="activeTab === 'forms'" class="animate-fade-in">
          <div class="grid-layout-2">
            <!-- Inputs -->
            <rb-card-form title="Input Components" subtitle="All form input types in one place">
              <rb-input label="Text Input" placeholder="Enter username..."></rb-input>
              <rb-input label="Number Input" type="number" placeholder="Enter amount..."></rb-input>
              <rb-input label="Password Input" type="password" placeholder="••••••••"></rb-input>
              <rb-input label="With Error" error="This field is required." value="wrong@email" placeholder="Email"></rb-input>
              <rb-input label="Success Validated" [success]="true" value="john@example.com" placeholder="Email"></rb-input>
              <rb-textarea label="Textarea / Multi-line" placeholder="Write your message here..." [rows]="4"></rb-textarea>
              <rb-select label="Custom Select Box" [options]="countryOptions" placeholder="Choose country..." [(value)]="selectedCountry"></rb-select>

              <div footer>
                <button (click)="triggerToast('Form submitted!', 'success')" class="bg-primary text-white border-none rounded-sm px-4 py-2 cursor-pointer font-sans font-semibold text-sm">Submit</button>
              </div>
            </rb-card-form>

            <!-- Choices & Toggles -->
            <rb-card-form title="Selection Controls" subtitle="Checkbox, Radio, Toggle">
              <div>
                <span class="text-xs font-semibold text-muted block mb-2">Checkbox Group</span>
                <div class="flex flex-col gap-2">
                  <rb-checkbox label="Enable notifications" [(checked)]="check1"></rb-checkbox>
                  <rb-checkbox label="Subscribe to newsletter" [(checked)]="check2"></rb-checkbox>
                  <rb-checkbox label="Disabled option" [disabled]="true"></rb-checkbox>
                </div>
              </div>
              <rb-radio label="Choose user role" [options]="roleOptions" [(value)]="selectedRole"></rb-radio>
              <div class="border-t pt-4 flex flex-col gap-3">
                <span class="text-xs font-semibold text-muted block">Toggle Switches</span>
                <rb-toggle label="Enable dark mode" [(checked)]="toggle1"></rb-toggle>
                <rb-toggle label="Allow analytics" [(checked)]="toggle2"></rb-toggle>
                <rb-toggle label="Disabled toggle" [disabled]="true" [checked]="true"></rb-toggle>
              </div>
              <div class="p-2 bg-light-gray rounded-xs text-xs font-mono mt-2">
                Role: {{ selectedRole }} | DarkMode: {{ toggle1 }} | Analytics: {{ toggle2 }}
              </div>
            </rb-card-form>
          </div>
        </section>

        <!-- ====== CALENDAR ====== -->
        <section *ngIf="activeTab === 'calendar'" class="animate-fade-in">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fa-solid fa-calendar text-primary"></i> Calendar Component
          </h2>
          <div class="flex flex-wrap gap-6 items-start">
            <rb-calendar [(selectedDate)]="calendarDate"></rb-calendar>
            <div class="card flex-grow-1">
              <h3 class="text-base font-bold mb-3">Selected Date Info</h3>
              <div class="p-3 bg-light-gray rounded-xs text-sm font-mono mb-3">
                {{ calendarDate ? (calendarDate | date:'EEEE, d MMMM yyyy') : 'No date selected yet.' }}
              </div>
              <p class="text-sm text-muted">Click any date on the calendar to select it. Navigate months using the chevron buttons. Today's date is highlighted automatically.</p>
            </div>
          </div>
        </section>

        <!-- ====== COMPONENTS ====== -->
        <section *ngIf="activeTab === 'components'" class="animate-fade-in">
          <div class="grid-layout-2">
            <!-- Buttons -->
            <div class="card">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-fingerprint text-primary"></i> Buttons
              </h2>
              <div class="flex flex-wrap gap-3 mb-4">
                <rb-button>Primary</rb-button>
                <rb-button [disabled]="true">Disabled</rb-button>
              </div>
              <div class="flex flex-wrap gap-2">
                <button class="btn-util bg-success text-white border-none rounded-sm px-3 py-2 cursor-pointer text-sm font-sans flex items-center gap-1.5" (click)="triggerToast('Success!', 'success')">
                  <i class="fa-solid fa-check"></i> Success
                </button>
                <button class="btn-util bg-danger text-white border-none rounded-sm px-3 py-2 cursor-pointer text-sm font-sans flex items-center gap-1.5" (click)="triggerToast('Error!', 'danger')">
                  <i class="fa-solid fa-xmark"></i> Danger
                </button>
                <button class="btn-util bg-warning text-dark border-none rounded-sm px-3 py-2 cursor-pointer text-sm font-sans flex items-center gap-1.5" (click)="triggerToast('Warning!', 'warning')">
                  <i class="fa-solid fa-triangle-exclamation"></i> Warning
                </button>
                <button class="btn-util bg-info text-white border-none rounded-sm px-3 py-2 cursor-pointer text-sm font-sans flex items-center gap-1.5" (click)="triggerToast('Info!', 'info')">
                  <i class="fa-solid fa-info"></i> Info
                </button>
              </div>
            </div>

            <!-- Overlays & Triggers -->
            <div class="card">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-layer-group text-primary"></i> Overlays & Panels
              </h2>
              <div class="flex flex-wrap gap-2">
                <button (click)="openDialog('md')" class="bg-primary text-white border-none rounded-sm px-3 py-2 cursor-pointer text-sm font-sans flex items-center gap-1.5">
                  <i class="fa-solid fa-window-restore"></i> Open Dialog
                </button>
                <button (click)="dialogService.open('Confirm Delete','Are you sure you want to delete this item?', onConfirmDelete, onCancelDelete)" class="bg-danger text-white border-none rounded-sm px-3 py-2 cursor-pointer text-sm font-sans flex items-center gap-1.5">
                  <i class="fa-solid fa-trash-can"></i> DialogService
                </button>
                <button (click)="isDrawerOpen = true" class="bg-success text-white border-none rounded-sm px-3 py-2 cursor-pointer text-sm font-sans flex items-center gap-1.5">
                  <i class="fa-solid fa-angles-right"></i> Open Drawer
                </button>
                <button (click)="isSideFormOpen = true" class="bg-info text-white border-none rounded-sm px-3 py-2 cursor-pointer text-sm font-sans flex items-center gap-1.5">
                  <i class="fa-solid fa-list-check"></i> Side Form
                </button>
                <button (click)="isSideFormBottomOpen = true" class="bg-warning text-dark border-none rounded-sm px-3 py-2 cursor-pointer text-sm font-sans flex items-center gap-1.5">
                  <i class="fa-solid fa-arrow-up-from-bracket"></i> Sheet
                </button>
                <button (click)="isLoading = true; stopLoading()" class="border border-color bg-transparent rounded-sm px-3 py-2 cursor-pointer text-sm font-sans flex items-center gap-1.5">
                  <i class="fa-solid fa-spinner fa-spin"></i> Overlay Loading
                </button>
              </div>
            </div>
          </div>

          <!-- Accordion Demo -->
          <div class="card mt-4">
            <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
              <i class="fa-solid fa-square-caret-down text-primary"></i> Accordion Panels
            </h2>
            <rb-accordion title="Accordion Panel 1 (Default Closed)">
              <p class="m-0 text-sm">This is expandable accordion block body content. Inside accordions, you can place nested HTML markup, cards, or custom widgets easily.</p>
            </rb-accordion>
            <rb-accordion title="Accordion Panel 2 (Default Expanded)" [expanded]="true">
              <p class="m-0 text-sm">This accordion panel starts as expanded because we bound <code>[expanded]="true"</code>.</p>
            </rb-accordion>
          </div>

          <!-- Tabs Component Demo -->
          <div class="card mt-4">
            <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
              <i class="fa-solid fa-folder-closed text-primary"></i> Tabs Component
            </h2>
            <rb-tabs [tabs]="demoTabs" [(activeTab)]="demoActiveTab">
              <div *ngIf="demoActiveTab === 'profile'" class="animate-fade-in">
                <p class="text-sm text-muted">This is the <strong>Profile</strong> tab panel content area.</p>
              </div>
              <div *ngIf="demoActiveTab === 'settings'" class="animate-fade-in">
                <p class="text-sm text-muted">This is the <strong>Settings</strong> tab panel content area.</p>
              </div>
              <div *ngIf="demoActiveTab === 'billing'" class="animate-fade-in">
                <p class="text-sm text-muted">This is the <strong>Billing</strong> tab panel content area.</p>
              </div>
            </rb-tabs>
          </div>
        </section>

        <!-- ====== DATAGRID / TABLE ====== -->
        <section *ngIf="activeTab === 'datagrid'" class="animate-fade-in">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fa-solid fa-table text-primary"></i> Enterprise Data Table & Paginator
          </h2>
          <div class="card mb-4">
            <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div class="flex gap-2">
                <button (click)="tableLoading = !tableLoading" class="border rounded-sm px-3 py-1 bg-transparent text-sm cursor-pointer font-sans">
                  Toggle Loading State ({{ tableLoading ? 'ON' : 'OFF' }})
                </button>
              </div>
              <span class="text-sm text-muted">Sort: <strong>{{ sortColumn || 'None' }}</strong> ({{ sortDirection }})</span>
            </div>
            <rb-table
              [columns]="tableColumns"
              [data]="tableData"
              [loading]="tableLoading"
              [totalCount]="100"
              [pageSize]="10"
              [page]="tablePage"
              (pageChange)="onTablePageChange($event)"
              (sortChange)="onTableSort($event)">
            </rb-table>
          </div>
        </section>

        <!-- ====== DASHBOARD WIDGETS ====== -->
        <section *ngIf="activeTab === 'dashboard'" class="animate-fade-in">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fa-solid fa-gauge-high text-primary"></i> KPI Metric Indicators
          </h2>
          <div class="grid-layout-3 mb-6">
            <rb-metric-card title="Total Revenue" value="$48,259.00" [change]="12.5" icon="fa-solid fa-sack-dollar"></rb-metric-card>
            <rb-metric-card title="Active Subscriptions" value="1,842" [change]="8.2" icon="fa-solid fa-users"></rb-metric-card>
            <rb-metric-card title="System Error Rate" value="0.04%" [change]="-1.5" icon="fa-solid fa-triangle-exclamation"></rb-metric-card>
          </div>

          <div class="grid-layout-2">
            <!-- Stepper Variant Demos -->
            <div class="card col-span-2">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-list-ol text-primary"></i> Expanded Stepper Component Variants
              </h2>
              
              <div class="flex flex-col gap-8">
                <!-- 1. Default Stepper -->
                <div>
                  <h3 class="text-sm font-semibold text-muted mb-3">1. Horizontal Stepper (Default)</h3>
                  <rb-stepper [steps]="stepperSteps" [(currentStep)]="currentStepperStep" variant="horizontal"></rb-stepper>
                </div>

                <!-- 2. Centered Stepper (Connecting Line) -->
                <div class="border-t pt-4">
                  <h3 class="text-sm font-semibold text-muted mb-3">2. Centered Stepper (With middle connecting line)</h3>
                  <rb-stepper [steps]="stepperSteps" [(currentStep)]="currentStepperStep" variant="centered"></rb-stepper>
                </div>

                <!-- 3. Horizontal Timeline Process -->
                <div class="border-t pt-4">
                  <h3 class="text-sm font-semibold text-muted mb-3">3. Horizontal Timeline Process Flow (Status & Custom Icons)</h3>
                  <rb-stepper [steps]="timelineProcessSteps" [(currentStep)]="timelineProcessStep" variant="timeline"></rb-stepper>
                </div>

                <!-- 4. Vertical Stepper -->
                <div class="border-t pt-4">
                  <h3 class="text-sm font-semibold text-muted mb-3">4. Vertical Progress Stepper</h3>
                  <div class="flex gap-4 flex-wrap">
                    <div class="grow max-w-md">
                      <rb-stepper [steps]="stepperSteps" [(currentStep)]="currentStepperStep" variant="vertical"></rb-stepper>
                    </div>
                  </div>
                </div>

                <div class="p-3 bg-light-gray rounded-xs text-sm flex justify-between items-center">
                  <span>Current index: <strong>Step {{ currentStepperStep + 1 }}</strong> / Timeline: <strong>Step {{ timelineProcessStep + 1 }}</strong></span>
                  <div class="flex gap-2">
                    <button (click)="prevStep()" [disabled]="currentStepperStep === 0 && timelineProcessStep === 0" class="border rounded-sm px-3 py-1 text-sm bg-transparent cursor-pointer font-semibold">Prev</button>
                    <button (click)="nextStep()" [disabled]="currentStepperStep === stepperSteps.length - 1 && timelineProcessStep === timelineProcessSteps.length - 1" class="bg-primary text-white border-none rounded-sm px-3 py-1 text-sm cursor-pointer font-semibold">Next</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- File Upload Dropzone -->
            <div class="card col-span-2">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-cloud-arrow-up text-primary"></i> File Attachment Dropzone
              </h2>
              <rb-file-upload label="Upload Document" [multiple]="true" accept=".pdf, .png, .jpg"></rb-file-upload>
            </div>
          </div>
        </section>

        <!-- ====== FEEDBACK ====== -->
        <section *ngIf="activeTab === 'feedback'" class="animate-fade-in">
          <div class="grid-layout-2">
            <!-- Tooltips -->
            <div class="card">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-comment-medical text-primary"></i> Tooltips (Hover Me)
              </h2>
              <div class="flex items-center gap-4 flex-wrap">
                <rb-tooltip text="This is a top tooltip!" position="top">
                  <button class="bg-primary text-white border-none rounded-sm px-3 py-2 cursor-pointer text-sm">Tooltip Top</button>
                </rb-tooltip>
                <rb-tooltip text="Look down here!" position="bottom">
                  <button class="bg-success text-white border-none rounded-sm px-3 py-2 cursor-pointer text-sm">Tooltip Bottom</button>
                </rb-tooltip>
                <rb-tooltip text="To the left!" position="left">
                  <button class="bg-warning text-dark border-none rounded-sm px-3 py-2 cursor-pointer text-sm">Tooltip Left</button>
                </rb-tooltip>
                <rb-tooltip text="To the right!" position="right">
                  <button class="bg-info text-white border-none rounded-sm px-3 py-2 cursor-pointer text-sm">Tooltip Right</button>
                </rb-tooltip>
              </div>
            </div>

            <!-- Alerts -->
            <div class="card">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-bullhorn text-primary"></i> Alert Banners
              </h2>
              <div class="flex flex-col gap-3">
                <rb-alert type="success" title="Data saved" message="Your changes have been saved successfully."></rb-alert>
                <rb-alert type="danger" title="Payment failed" message="Could not process your credit card. Please try again."></rb-alert>
                <rb-alert type="warning" message="Your session will expire in 5 minutes."></rb-alert>
                <rb-alert type="info" message="System maintenance scheduled for Sunday at 2AM."></rb-alert>
              </div>
            </div>

            <!-- Progress & Skeleton -->
            <div class="card">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-spinner text-primary"></i> Progress Bars
              </h2>
              <div class="flex flex-col gap-4">
                <rb-progress-bar label="Upload Progress" [value]="72" color="primary"></rb-progress-bar>
                <rb-progress-bar label="Storage Used" [value]="91" color="danger"></rb-progress-bar>
                <rb-progress-bar label="Task Completion" [value]="45" color="success" height="12px"></rb-progress-bar>
                <rb-progress-bar label="Memory" [value]="30" color="warning"></rb-progress-bar>
              </div>

              <h2 class="text-lg font-bold mt-6 mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-list text-primary"></i> Skeleton Loader
              </h2>
              <rb-skeleton [rows]="[{width:'40%',height:'14px'},{width:'100%',height:'16px'},{width:'100%',height:'16px'},{width:'60%',height:'16px'}]"></rb-skeleton>
            </div>

            <!-- Badges & Spinners -->
            <div class="card">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-certificate text-primary"></i> Badges
              </h2>
              <div class="flex flex-wrap gap-2">
                <span class="badge badge-primary">Primary</span>
                <span class="badge badge-success">Success</span>
                <span class="badge badge-danger">Danger</span>
                <span class="badge badge-warning">Warning</span>
                <span class="badge badge-info">Info</span>
              </div>
              <h2 class="text-lg font-bold mt-4 mb-3 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-rotate text-primary"></i> Loading Spinners
              </h2>
              <div class="flex items-center gap-6">
                <div class="flex flex-col items-center gap-1">
                  <div class="spinner spinner-sm"></div>
                  <span class="text-xs text-muted">sm</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <div class="spinner"></div>
                  <span class="text-xs text-muted">md</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <div class="spinner spinner-lg"></div>
                  <span class="text-xs text-muted">lg</span>
                </div>
              </div>
            </div>

            <!-- Cards -->
            <div class="card">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-address-card text-primary"></i> Card Styles
              </h2>
              <div class="flex flex-col gap-3">
                <div class="card" style="margin:0"><p class="text-sm text-muted m-0">Standard Card</p></div>
                <div class="card card-hoverable" style="margin:0"><p class="text-sm text-muted m-0">Hoverable Card — hover me!</p></div>
                <div class="glass-card p-3"><p class="text-sm m-0">Glassmorphism Card</p></div>
              </div>
            </div>
          </div>
        </section>

        <!-- ====== LAYOUTS ====== -->
        <section *ngIf="activeTab === 'layouts'" class="animate-fade-in">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fa-solid fa-border-all text-primary"></i> Grid System
          </h2>
          <div class="grid grid-cols-12 gap-2 mb-4">
            <div *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12]" class="text-center p-2 rounded-xs font-bold text-xs bg-primary text-white">{{ i }}</div>
          </div>
          <div class="grid grid-cols-12 gap-3 mb-6">
            <div class="col-span-8 p-3 bg-light-gray rounded-sm text-center font-semibold text-sm">8</div>
            <div class="col-span-4 p-3 bg-light-gray rounded-sm text-center font-semibold text-sm">4</div>
            <div class="col-span-4 p-3 bg-light-gray rounded-sm text-center font-semibold text-sm">4</div>
            <div class="col-span-4 p-3 bg-light-gray rounded-sm text-center font-semibold text-sm">4</div>
            <div class="col-span-4 p-3 bg-light-gray rounded-sm text-center font-semibold text-sm">4</div>
          </div>

          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <i class="fa-solid fa-font text-primary"></i> Typography Scale
          </h2>
          <div class="card flex flex-col gap-3">
            <p class="text-4xl font-extrabold m-0">text-4xl ExtraBold</p>
            <p class="text-3xl font-bold m-0">text-3xl Bold</p>
            <p class="text-2xl font-semibold m-0">text-2xl SemiBold</p>
            <p class="text-xl font-medium m-0">text-xl Medium</p>
            <p class="text-lg font-normal m-0">text-lg Normal</p>
            <p class="text-base m-0">text-base body copy with line height 1.5</p>
            <p class="text-sm text-muted m-0">text-sm muted secondary text</p>
            <p class="text-xs text-light-grey m-0">text-xs caption / meta label</p>
          </div>
        </section>

        <!-- ====== NEW PREMIUM COMPONENTS ====== -->
        <section *ngIf="activeTab === 'new-components'" class="animate-fade-in">
          <div class="grid-layout-2">
            <!-- 1. Badge Component -->
            <div class="card">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-certificate text-primary"></i> Badges (rb-badge)
              </h2>
              <p class="text-sm text-muted mb-4">สถานะแบบจุด (Dot) หรือจำนวนตัวเลขแจ้งเตือนที่มีฟังก์ชันปัดเศษจำนวนสูงสุด (Max Overflow)</p>
              
              <div class="flex items-center gap-4 flex-wrap mb-4" style="margin-top: 15px;">
                <div class="relative inline-block">
                  <button class="bg-primary text-white border-none rounded-sm px-4 py-2 cursor-pointer text-sm">Inbox</button>
                  <rb-badge [content]="5" type="danger" style="position: absolute; top: -8px; right: -8px;"></rb-badge>
                </div>
                
                <div class="relative inline-block">
                  <button class="bg-light-gray text-main border rounded-sm px-4 py-2 cursor-pointer text-sm">Notifications</button>
                  <rb-badge [dot]="true" type="success" style="position: absolute; top: -3px; right: -3px;"></rb-badge>
                </div>

                <div class="relative inline-block">
                  <button class="bg-secondary text-main border rounded-sm px-4 py-2 cursor-pointer text-sm">Messages</button>
                  <rb-badge [content]="120" [max]="99" type="warning" style="position: absolute; top: -8px; right: -8px;"></rb-badge>
                </div>
              </div>

              <div class="flex items-center gap-2 flex-wrap">
                <rb-badge content="New" type="primary"></rb-badge>
                <rb-badge content="Success" type="success"></rb-badge>
                <rb-badge content="Pending" type="warning"></rb-badge>
                <rb-badge content="Failed" type="danger"></rb-badge>
                <rb-badge content="Info" type="info"></rb-badge>
              </div>
            </div>

            <!-- 2. Avatar Component -->
            <div class="card">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-circle-user text-primary"></i> Avatars (rb-avatar)
              </h2>
              <p class="text-sm text-muted mb-4">แสดงรูปผู้ใช้, ตัวย่อชื่อแบบจับคู่สีสุ่มอัตโนมัติ หรือรูปสัญลักษณ์สำรองเมื่อดาวน์โหลดรูปไม่สำเร็จ</p>
              
              <div class="flex flex-col gap-4">
                <!-- Sizes & Shapes -->
                <div class="flex items-center gap-3 flex-wrap">
                  <rb-avatar size="sm" name="Small Size"></rb-avatar>
                  <rb-avatar size="md" name="Medium Size"></rb-avatar>
                  <rb-avatar size="lg" name="Large Size" shape="square"></rb-avatar>
                  <rb-avatar size="xl" name="Extra Large"></rb-avatar>
                </div>

                <!-- Custom Initials & Automatic Color Map -->
                <div>
                  <h3 class="text-xs font-bold text-muted mb-2">ชื่อต่างกัน จะได้รับโทนสีพื้นหลังต่างกันอัตโนมัติ</h3>
                  <div class="flex items-center gap-2 flex-wrap">
                    <rb-avatar name="Kittipat Promma" title="Kittipat Promma"></rb-avatar>
                    <rb-avatar name="Nattapon Janthong" title="Nattapon Janthong"></rb-avatar>
                    <rb-avatar name="Somchai Jaidee" title="Somchai Jaidee"></rb-avatar>
                    <rb-avatar name="Jane Smith" title="Jane Smith"></rb-avatar>
                  </div>
                </div>

                <!-- Avatar Group -->
                <div>
                  <h3 class="text-xs font-bold text-muted mb-2">Avatar Group (แสดงผู้ใช้ที่เข้าร่วม)</h3>
                  <div class="rb-avatar-group">
                    <rb-avatar name="Kittipat" [group]="true"></rb-avatar>
                    <rb-avatar name="Nattapon" [group]="true"></rb-avatar>
                    <rb-avatar name="Somchai" [group]="true"></rb-avatar>
                    <rb-avatar name="+3" [group]="true" style="background-color: var(--rb-slate-200) !important; color: var(--rb-slate-800) !important; font-weight: bold;"></rb-avatar>
                  </div>
                </div>
              </div>
            </div>

            <!-- 3. Timeline Component -->
            <div class="card col-span-2">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-timeline text-primary"></i> Timeline (rb-timeline)
              </h2>
              <p class="text-sm text-muted mb-4">แสดงลำดับขั้นตอนการทำงาน ประวัติบันทึกกิจกรรม หรือสเตตัสในลักษณะไทม์ไลน์สวยงาม</p>
              
              <div class="flex flex-col gap-6">
                <div>
                  <h3 class="text-sm font-semibold mb-3">Alignment: Left (โหมดเริ่มต้น)</h3>
                  <rb-timeline [items]="timelineItems"></rb-timeline>
                </div>
                <div class="border-t pt-4">
                  <h3 class="text-sm font-semibold mb-3">Alignment: Alternate (สลับซ้ายขวา)</h3>
                  <rb-timeline [items]="timelineItems" mode="alternate"></rb-timeline>
                </div>
              </div>
            </div>

            <!-- 4. Empty State Component -->
            <div class="card col-span-2">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-hourglass-empty text-primary"></i> Empty State (rb-empty)
              </h2>
              <p class="text-sm text-muted mb-4">หน้าจอแสดงผลข้อมูลว่างเปล่า ดีไซน์พรีเมียมด้วยภาพ SVG วาดเส้นแบบ Modern</p>
              
              <div class="grid grid-cols-3 gap-4">
                <div class="border rounded p-3 bg-page" style="border: 1px solid var(--border-color, var(--rb-slate-200)); border-radius: 8px;">
                  <rb-empty title="ไม่มีกล่องข้อมูล" description="ไม่พบกล่องข้อมูลจัดเก็บในคลังปัจจุบันของคุณ" iconType="box">
                    <button class="bg-primary text-white border-none rounded-sm px-3 py-1-5 cursor-pointer text-xs" style="padding: 6px 12px; border-radius: 4px;" (click)="triggerToast('เพิ่มกล่องแล้ว', 'success')">เพิ่มกล่อง</button>
                  </rb-empty>
                </div>
                <div class="border rounded p-3 bg-page" style="border: 1px solid var(--border-color, var(--rb-slate-200)); border-radius: 8px;">
                  <rb-empty title="ไม่พบโฟลเดอร์" description="โปรดตรวจสอบการเชื่อมต่อพื้นที่เก็บไฟล์ภายนอก" iconType="folder">
                    <button class="bg-light-gray text-main border rounded-sm px-3 py-1-5 cursor-pointer text-xs" style="padding: 6px 12px; border: 1px solid var(--border-color); border-radius: 4px;" (click)="triggerToast('กำลังเชื่อมต่อใหม่', 'info')">เชื่อมต่อใหม่</button>
                  </rb-empty>
                </div>
                <div class="border rounded p-3 bg-page" style="border: 1px solid var(--border-color, var(--rb-slate-200)); border-radius: 8px;">
                  <rb-empty title="ไม่พบผลลัพธ์การค้นหา" description="ลองตรวจสอบตัวสะกดหรือเปลี่ยนคำค้นหาอีกครั้ง" iconType="search"></rb-empty>
                </div>
              </div>
            </div>

            <!-- 5. Sidebar Component -->
            <div class="card col-span-2">
              <h2 class="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
                <i class="fa-solid fa-rectangle-list text-primary"></i> Sidebar (rb-sidebar)
              </h2>
              <p class="text-sm text-muted mb-4">คอมโพเนนต์เมนูนำทางด้านข้างแบบพรีเมียม ตอบสนองได้ทุกอุปกรณ์ (Responsive) มาพร้อมช่องค้นหาข้อมูลเมนูในตัว</p>
              
              <div class="flex gap-4 items-start flex-wrap">
                <!-- Live Sidebar Render -->
                <div class="border rounded bg-page overflow-hidden" style="border: 1px solid var(--border-color, var(--rb-slate-200)); border-radius: 8px; width: 280px; height: 450px; position: relative;">
                  <rb-sidebar 
                    [items]="demoSidebarItems" 
                    [(activeId)]="demoSidebarActiveId" 
                    logoText="RBHUP Enterprise"
                    [searchable]="true"
                    searchPlaceholder="ค้นหาเมนู..."
                    (itemClick)="triggerToast('Clicked: ' + $event.label, 'info')"
                    style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;">
                    
                    <!-- Footer Slot -->
                    <div footer class="px-3 py-2 text-xs text-muted text-center">
                      v1.0.0 · RBHUP UI
                    </div>
                  </rb-sidebar>
                </div>

                <!-- State Controller info -->
                <div class="grow p-4 bg-light-gray rounded-sm" style="border-radius: 8px; min-width: 250px;">
                  <h3 class="text-sm font-semibold mb-2">สถานะการเลือกเมนูปัจจุบัน:</h3>
                  <div class="p-3 bg-page border rounded font-mono text-sm mb-4" style="border-radius: 4px; border: 1px solid var(--border-color, var(--rb-slate-200));">
                    Active Menu ID: <strong>{{ demoSidebarActiveId }}</strong>
                  </div>
                  <p class="text-xs text-muted leading-relaxed">
                    * ในหน้าจอมือถือ/แท็บเล็ต คอมโพเนนต์จะย่อตัวเป็นแถบด้านบนพร้อมปุ่มแฮมเบอร์เกอร์โดยอัตโนมัติ ผู้ใช้งานสามารถกดเปิด/ปิดสไลด์เมนู (Drawer Sidebar) ได้อย่างลื่นไหล
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ====== LOGIN PAGE ====== -->
        <section *ngIf="activeTab === 'login'" class="animate-fade-in">
          <h2 class="text-xl font-bold mb-2 flex items-center gap-2">
            <i class="fa-solid fa-right-to-bracket text-primary"></i> Login Page (rb-login)
          </h2>
          <p class="text-sm text-muted mb-6">หน้า Login สำเร็จรูปพรีเมียม รองรับ 2 variant: <code>split</code> (แบบแบ่งครึ่งจอ) และ <code>card</code> (การ์ดกลางจอ) พร้อม Social Login, Validation, Dark Mode และ Responsive</p>

          <!-- Variant switcher + Full Page link -->
          <div class="flex items-center gap-3 mb-4 flex-wrap">
            <span class="text-xs font-semibold text-muted">VARIANT:</span>
            <button (click)="loginVariant = 'split'" class="tab-btn flex items-center gap-1" [class.active]="loginVariant === 'split'">
              <i class="fa-solid fa-table-columns"></i> Split Layout
            </button>
            <button (click)="loginVariant = 'card'" class="tab-btn flex items-center gap-1" [class.active]="loginVariant === 'card'">
              <i class="fa-solid fa-credit-card"></i> Card (Center)
            </button>
            <div class="border-l pl-3 ml-1 flex items-center gap-2">
              <span class="text-xs font-semibold text-muted">DEMO:</span>
              <button (click)="loginDemoLoading = !loginDemoLoading" class="tab-btn text-xs">
                <i class="fa-solid" [class.fa-spinner]="loginDemoLoading" [class.fa-spin]="loginDemoLoading" [class.fa-bolt]="!loginDemoLoading"></i>
                {{ loginDemoLoading ? 'Loading ON' : 'Toggle Loading' }}
              </button>
              <button (click)="loginDemoError = loginDemoError ? '' : 'รหัสผ่านหรืออีเมลไม่ถูกต้อง กรุณาลองอีกครั้ง'" class="tab-btn text-xs">
                <i class="fa-solid fa-triangle-exclamation"></i>
                {{ loginDemoError ? 'Hide Error' : 'Show Error' }}
              </button>
            </div>
            <div class="border-l pl-3 ml-1">
              <a href="/login" target="_blank"
                style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:100px;background:var(--primary);color:#fff;font-size:12px;font-weight:700;text-decoration:none;transition:opacity 0.2s;"
                onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Full Page Demo
              </a>
            </div>
          </div>

          <!-- Live preview in a scoped iframe-like container -->
          <div class="card p-0 overflow-hidden" style="height: 600px; border-radius: 12px;">
            <rb-login
              [variant]="loginVariant"
              appName="RBHUP Enterprise"
              brandDescription="ระบบบริหารจัดการองค์กรยุคใหม่ ครบวงจร ปลอดภัย รวดเร็ว"
              [loading]="loginDemoLoading"
              [alertMessage]="loginDemoError"
              [socialProviders]="loginSocialProviders"
              [features]="loginFeatures"
              (loginSubmit)="onLoginSubmit($event)"
              (forgotPasswordClick)="triggerToast('Forgot password clicked', 'info')"
              (registerClick)="triggerToast('Register clicked', 'primary')"
              (socialLoginClick)="triggerToast('Social login: ' + $event.label, 'info')"
            ></rb-login>
          </div>

          <!-- Last submitted values -->
          <div *ngIf="loginLastSubmit" class="card mt-4">
            <h3 class="text-sm font-bold mb-2 flex items-center gap-2">
              <i class="fa-solid fa-circle-check text-success"></i> Last Submitted Form Value
            </h3>
            <pre class="text-xs font-mono p-3 bg-light-gray rounded-sm m-0" style="border-radius: 6px; overflow-x: auto;">{{ loginLastSubmit | json }}</pre>
          </div>
        </section>

      </main>

      <!-- ====== DECLARATIVE DIALOG ====== -->
      <rb-dialog [title]="dialogTitle" [size]="dialogSize" [(visible)]="isDialogVisible">
        <p class="m-0 text-sm">This modal dialog was opened declaratively using <code>[(visible)]</code> binding. Click outside or the ✕ button to dismiss it.</p>
        <div footer>
          <button (click)="isDialogVisible = false" class="bg-light-gray text-dark border-none rounded-sm px-3 py-2 cursor-pointer text-sm font-sans">Cancel</button>
          <button (click)="confirmDialog()" class="bg-primary text-white border-none rounded-sm px-3 py-2 cursor-pointer text-sm font-sans ml-2">Confirm</button>
        </div>
      </rb-dialog>

      <!-- ====== DRAWER ====== -->
      <rb-drawer title="Side Drawer Panel" [(visible)]="isDrawerOpen" position="right">
        <div class="flex flex-col gap-4">
          <rb-input label="Search" placeholder="Search anything..."></rb-input>
          <rb-select label="Category" [options]="countryOptions" placeholder="Select..."></rb-select>
          <rb-alert type="info" message="This is a right-side drawer that slides in from the edge." [dismissible]="false"></rb-alert>
        </div>
        <div footer class="flex gap-2">
          <button (click)="isDrawerOpen = false" class="bg-light-gray text-dark border-none rounded-sm px-4 py-2 cursor-pointer text-sm font-sans">Close</button>
          <button (click)="triggerToast('Drawer saved!', 'success'); isDrawerOpen = false" class="bg-primary text-white border-none rounded-sm px-4 py-2 cursor-pointer text-sm font-sans">Save</button>
        </div>
      </rb-drawer>

      <!-- ====== SIDE FORM RIGHT ====== -->
      <rb-side-form title="Create New User" subtitle="Fill in the details below" mode="right" [(visible)]="isSideFormOpen">
        <div class="flex flex-col gap-4">
          <rb-input label="Full Name" placeholder="John Doe"></rb-input>
          <rb-input label="Email Address" type="email" placeholder="john@company.com"></rb-input>
          <rb-input label="Password" type="password" placeholder="••••••••"></rb-input>
          <rb-select label="Role" [options]="[{value:'admin',label:'Admin'},{value:'user',label:'User'},{value:'guest',label:'Guest'}]" placeholder="Select role..."></rb-select>
          <rb-toggle label="Send welcome email" [checked]="true"></rb-toggle>
          <rb-checkbox label="I agree to the Terms of Service" [(checked)]="check1"></rb-checkbox>
        </div>
        <div footer>
          <button (click)="isSideFormOpen = false" class="bg-light-gray text-dark border-none rounded-sm px-4 py-2 cursor-pointer text-sm font-sans">Cancel</button>
          <button (click)="triggerToast('User created!', 'success'); isSideFormOpen = false" class="bg-primary text-white border-none rounded-sm px-4 py-2 cursor-pointer text-sm font-sans ml-2">Create User</button>
        </div>
      </rb-side-form>

      <!-- ====== SIDE FORM BOTTOM (SHEET) ====== -->
      <rb-side-form title="Quick Filter" subtitle="Filter the current dataset" mode="bottom" [(visible)]="isSideFormBottomOpen">
        <div class="flex flex-col gap-4">
          <rb-select label="Status" [options]="[{value:'active',label:'Active'},{value:'inactive',label:'Inactive'},{value:'pending',label:'Pending'}]" placeholder="All statuses..."></rb-select>
          <rb-radio label="Date Range" [options]="[{value:'7d',label:'Last 7 days'},{value:'30d',label:'Last 30 days'},{value:'90d',label:'Last 90 days'}]" [(value)]="selectedDateRange"></rb-radio>
          <div class="border-t pt-3">
            <rb-checkbox label="Show archived records" [(checked)]="check2"></rb-checkbox>
          </div>
        </div>
        <div footer>
          <button (click)="isSideFormBottomOpen = false" class="bg-light-gray text-dark border-none rounded-sm px-4 py-2 cursor-pointer text-sm font-sans">Reset</button>
          <button (click)="triggerToast('Filters applied!', 'success'); isSideFormBottomOpen = false" class="bg-primary text-white border-none rounded-sm px-4 py-2 cursor-pointer text-sm font-sans ml-2">Apply Filters</button>
        </div>
      </rb-side-form>

    </div>
  `,
  styleUrls: ['./storybook.component.scss'],
})
export class StorybookComponent implements OnInit {
  activeTab = 'colors';
  activeTheme = '';
  isDarkMode = false;
  allComponents = 34;
  searchText = '';
  mobileMenuOpen = false;

  get filteredTabs() {
    if (!this.searchText.trim()) {
      return this.mainTabs;
    }
    const query = this.searchText.trim().toLowerCase();
    return this.mainTabs.filter(tab => 
      tab.label.toLowerCase().includes(query) || 
      tab.id.toLowerCase().includes(query)
    );
  }

  // Refactored Emojis -> Font Awesome
  mainTabs = [
    { id: 'colors', label: 'Colors', icon: 'fa-solid fa-palette' },
    { id: 'forms', label: 'Forms', icon: 'fa-solid fa-pen-to-square' },
    { id: 'calendar', label: 'Calendar', icon: 'fa-solid fa-calendar-days' },
    { id: 'components', label: 'Components', icon: 'fa-solid fa-puzzle-piece' },
    { id: 'datagrid', label: 'Table & Grid', icon: 'fa-solid fa-table' },
    { id: 'dashboard', label: 'Dashboard widgets', icon: 'fa-solid fa-chart-line' },
    { id: 'feedback', label: 'Feedback & Tooltip', icon: 'fa-solid fa-comment-dots' },
    { id: 'layouts', label: 'Layouts', icon: 'fa-solid fa-ruler-combined' },
    { id: 'new-components', label: 'New Components', icon: 'fa-solid fa-wand-magic-sparkles' },
    { id: 'login', label: 'Login Page', icon: 'fa-solid fa-right-to-bracket' },
  ];

  demoTabs: TabItem[] = [
    { id: 'profile', label: 'Profile', icon: 'fa-solid fa-user' },
    { id: 'settings', label: 'Settings', icon: 'fa-solid fa-gear' },
    { id: 'billing', label: 'Billing', icon: 'fa-solid fa-credit-card' },
  ];

  demoSidebarActiveId = 'dashboard';
  demoSidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-chart-simple', badge: 'New', badgeType: 'success' },
    { id: 'users', label: 'Users & Customers', icon: 'fa-solid fa-users', badge: '12', badgeType: 'primary' },
    { id: 'projects', label: 'Projects & Tasks', icon: 'fa-solid fa-folder-open' },
    { id: 'settings', label: 'System Settings', icon: 'fa-solid fa-gears' },
    { id: 'billing', label: 'Billing & Invoices', icon: 'fa-solid fa-file-invoice-dollar', badge: 'Expired', badgeType: 'danger' }
  ];

  timelineItems: TimelineItem[] = [
    { title: 'สร้างเอกสารสำเร็จ', subtitle: 'โดย Kittipat Promma', date: '08:30 น.', type: 'success', icon: 'fa-solid fa-check' },
    { title: 'ส่งต่อการอนุมัติ', subtitle: 'หัวหน้างานฝ่ายไอที', date: '09:15 น.', type: 'info', icon: 'fa-solid fa-info' },
    { title: 'พบปัญหาระบบตรวจสอบข้อมูล', subtitle: 'สิทธิ์การใช้งานไม่สมบูรณ์', date: '10:00 น.', type: 'danger', icon: 'fa-solid fa-xmark' },
    { title: 'แก้ไขข้อมูลสำเร็จ', subtitle: 'แก้ไขรายการโดยแอดมิน', date: '11:30 น.', type: 'warning', icon: 'fa-solid fa-triangle-exclamation' },
    { title: 'เสร็จสิ้นกระบวนการ', subtitle: 'เอกสารถูกบันทึกเข้าคลัง', date: '12:00 น.', type: 'success', icon: 'fa-solid fa-check' }
  ];

  // Stepper steps definitions
  stepperSteps: StepItem[] = [
    { title: 'Personal Info', description: 'Enter name and email' },
    { title: 'Billing Address', description: 'Shipping details' },
    { title: 'Confirm Order', description: 'Review summary' }
  ];

  timelineProcessSteps: StepItem[] = [
    { title: 'Order Placed', subTitle: '10:00 AM', description: 'Invoice generated', icon: 'fa-solid fa-cart-shopping', status: 'success' },
    { title: 'Processing', subTitle: '10:30 AM', description: 'Items gathered', icon: 'fa-solid fa-gears', status: 'info' },
    { title: 'Shipped', subTitle: '11:15 AM', description: 'In transit', icon: 'fa-solid fa-truck', status: 'warning' },
    { title: 'Delivered', subTitle: '12:00 PM', description: 'Recipient signed', icon: 'fa-solid fa-house-chimney', status: 'primary' }
  ];

  // Login demo state
  loginVariant: 'split' | 'card' = 'split';
  loginDemoLoading = false;
  loginDemoError = '';
  loginLastSubmit: any = null;
  loginSocialProviders: LoginSocialProvider[] = [
    { id: 'google',   label: 'Google',   icon: 'fa-brands fa-google',   color: '#EA4335' },
    { id: 'microsoft', label: 'Microsoft', icon: 'fa-brands fa-microsoft', color: '#00A4EF' },
  ];
  loginFeatures: { icon?: string; text: string }[] = [
    { icon: 'fa-solid fa-shield-halved',    text: 'Enterprise-grade security' },
    { icon: 'fa-solid fa-bolt',             text: 'Blazing fast performance' },
    { icon: 'fa-solid fa-layer-group',      text: 'Role-based access control' },
    { icon: 'fa-solid fa-cloud',            text: 'Cloud-native architecture' },
  ];

  onLoginSubmit(val: any) {
    this.loginLastSubmit = val;
    this.triggerToast(`Logged in as ${val.username}`, 'success');
  }

  // State
  isLoading = false;
  isDialogVisible = false;
  dialogTitle = ''; dialogSize: 'sm' | 'md' | 'lg' = 'md';
  isDrawerOpen = false;
  isSideFormOpen = false;
  isSideFormBottomOpen = false;
  calendarDate: Date | null = null;
  currentStepperStep = 1;
  timelineProcessStep = 1;

  // Form values
  check1 = true; check2 = false;
  toggle1 = false; toggle2 = true;
  selectedRole = 'user';
  selectedCountry = 'th';
  selectedDateRange = '30d';
  demoActiveTab = 'profile';

  // Table Data / State
  tableLoading = false;
  tablePage = 1;
  sortColumn = '';
  sortDirection = 'asc';
  tableColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Customer Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' }
  ];
  tableData = [
    { id: '#1001', name: 'Kittipat Promma', email: 'kittipat@rbhup.co.th', role: 'Developer', status: 'Active' },
    { id: '#1002', name: 'Nattapon Janthong', email: 'nattapon.j@gmail.com', role: 'Designer', status: 'Active' },
    { id: '#1003', name: 'Somchai Jaidee', email: 'somchai@company.com', role: 'Manager', status: 'Pending' },
    { id: '#1004', name: 'Jane Smith', email: 'jane.smith@outlook.com', role: 'Support', status: 'Inactive' },
    { id: '#1005', name: 'Bob Johnson', email: 'bob@tech.com', role: 'Admin', status: 'Active' }
  ];

  palettes = [
    { name: 'blue' }, { name: 'sky' }, { name: 'indigo' },
    { name: 'green' }, { name: 'lime' }, { name: 'orange' },
    { name: 'amber' }, { name: 'yellow' }, { name: 'red' },
    { name: 'purple' }, { name: 'fuchsia' }, { name: 'cyan' },
    { name: 'teal' }, { name: 'rose' }, { name: 'slate' }
  ];
  shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  countryOptions: SelectOption[] = [
    { value: 'th', label: 'Thailand (TH)' },
    { value: 'us', label: 'United States (US)' },
    { value: 'jp', label: 'Japan (JP)' },
    { value: 'sg', label: 'Singapore (SG)' },
  ];
  roleOptions: RadioOption[] = [
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'Standard User' },
    { value: 'guest', label: 'Guest Access' },
  ];

  onConfirmDelete = () => this.triggerToast('Item deleted!', 'danger');
  onCancelDelete = () => this.triggerToast('Delete cancelled.', 'info');

  constructor(
    public dialogService: DialogService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    if (typeof window === 'undefined') return;
    const cl = document.documentElement.classList;
    this.isDarkMode = cl.contains('theme-dark');
    for (const t of ['theme-orange', 'theme-som', 'theme-green', 'theme-blue', 'theme-purple']) {
      if (cl.contains(t)) { this.activeTheme = t; break; }
    }
  }

  setTheme(name: string) {
    if (typeof window === 'undefined') return;
    document.documentElement.classList.remove('theme-orange', 'theme-som', 'theme-green', 'theme-blue', 'theme-purple');
    if (name) document.documentElement.classList.add(name);
    this.activeTheme = name;
  }

  toggleDarkMode() {
    if (typeof window === 'undefined') return;
    const cl = document.documentElement.classList;
    cl.toggle('theme-dark');
    this.isDarkMode = cl.contains('theme-dark');
  }

  openDialog(size: 'sm' | 'md' | 'lg') {
    this.dialogSize = size; this.dialogTitle = `${size.toUpperCase()} Modal Dialog`;
    this.isDialogVisible = true;
  }

  confirmDialog() {
    this.isDialogVisible = false;
    this.triggerToast('Dialog confirmed!', 'success');
  }

  stopLoading() { setTimeout(() => this.isLoading = false, 2500); }

  triggerToast(msg: string, type: 'success' | 'danger' | 'warning' | 'info' | 'primary') {
    this.toastService.show(msg, type);
  }

  Math = Math;

  onTablePageChange(p: number) {
    this.tablePage = p;
    this.triggerToast(`Switched to page ${p}`, 'info');
  }

  onTableSort(event: { key: string; order: 'asc' | 'desc' }) {
    this.sortColumn = event.key;
    this.sortDirection = event.order;
    this.triggerToast(`Sorting by ${event.key} (${event.order})`, 'primary');
  }

  nextStep() {
    this.currentStepperStep = Math.min(this.stepperSteps.length - 1, this.currentStepperStep + 1);
    this.timelineProcessStep = Math.min(this.timelineProcessSteps.length - 1, this.timelineProcessStep + 1);
  }

  prevStep() {
    this.currentStepperStep = Math.max(0, this.currentStepperStep - 1);
    this.timelineProcessStep = Math.max(0, this.timelineProcessStep - 1);
  }
}
