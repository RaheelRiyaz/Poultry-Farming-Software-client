import {
  Component,
  ElementRef,
  Host,
  HostListener,
  Renderer2,
} from '@angular/core';
import { BaseService } from '../services/base.service';
import { UserInfo } from '../models/user';
import { environment } from '../../environments/environment.development';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrl: './farmer.component.scss',
})
export class FarmerComponent {
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private service: BaseService,
    private router: Router,
    protected commonService: CommonService
  ) {}
  userInfo: UserInfo = new UserInfo();

  ngOnInit(): void {
    if (window.innerWidth <= 767) this.closeSidebar();
    this.getUserDetails();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (window.innerWidth <= 767) this.closeSidebar();
      });
  }

  getUserDetails(): void {
    this.service.Find<UserInfo>('users/details').subscribe({
      next: (response) => {
        if (response.isSuccess) this.userInfo = response.result;
        else environment.fireSwal(response.message, false);
      },
      error: (err: Error) => {
        environment.fireSwal(err.message, false);
        throw err;
      },
    });
  }

  ngAfterViewInit(): void {
    // Close Sidebar
    this.checkThemePreference();
    const closeSidebarButton =
      this.elRef.nativeElement.querySelector('#close-sidebar');
    this.renderer.listen(closeSidebarButton, 'click', () =>
      this.closeSidebar()
    );

    // Show Sidebar
    const showSidebarButton =
      this.elRef.nativeElement.querySelector('#show-sidebar');
    this.renderer.listen(showSidebarButton, 'click', () => this.showSidebar());
  }

  toggleSidebarDropdown(link: any): void {
    const parent = link.parentElement;
    const isActive = parent.classList.contains('active');

    const sidebarDropdowns =
      this.elRef.nativeElement.querySelectorAll('.sidebar-dropdown');
    sidebarDropdowns.forEach((dropdown: any) =>
      dropdown.classList.remove('active')
    );

    if (isActive) {
      parent.classList.remove('active');
    } else {
      const submenu = parent.querySelector('.sidebar-submenu');
      this.renderer.setStyle(submenu, 'display', 'none');
      this.renderer.setStyle(submenu, 'display', 'block');
      parent.classList.add('active');
    }
  }

  closeSidebar(): void {
    const pageWrapper = this.elRef.nativeElement.querySelector('.page-wrapper');
    pageWrapper.classList.remove('toggled');
  }

  showSidebar(): void {
    const pageWrapper = this.elRef.nativeElement.querySelector('.page-wrapper');
    pageWrapper.classList.add('toggled');
  }

  @HostListener('window:resize')
  private handleScreenChange(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 767) {
      this.closeSidebar();
    } else {
      this.showSidebar();
    }
  }

  toggleDarkMode(toggleicon: HTMLElement): void {
    if (!document.body.classList.contains('dark-theme')) {
      localStorage.setItem('poultry-farming-color-scheme', 'dark-theme');
      this.renderer.addClass(document.body, 'dark-theme');
      toggleicon.classList.replace('fa-moon', 'fa-sun');
    } else {
      localStorage.removeItem('poultry-farming-color-scheme');
      this.renderer.removeClass(document.body, 'dark-theme');
      toggleicon.classList.replace('fa-sun', 'fa-moon');
    }
  }

  checkThemePreference(): void {
    const theme = localStorage.getItem('poultry-farming-color-scheme');
    if (theme) {
      this.renderer.addClass(document.body, theme);
      document.querySelector('.toggle')?.classList.replace('fa-moon', 'fa-sun');
    }
  }
}
