import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Briefcase, Building2, HardHat, LogOut, Newspaper, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { strings } from '@/strings.js'

const PAGES = [
  { path: '/partners', labelKey: 'navPartners', icon: Users },
  { path: '/companies', labelKey: 'navCompanies', icon: Building2 },
  { path: '/jobs', labelKey: 'navJobs', icon: Briefcase },
  { path: '/workers', labelKey: 'navWorkers', icon: HardHat },
  { path: '/blogs', labelKey: 'navBlogs', icon: Newspaper },
]

export function Shell({ admin, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const active = PAGES.find((p) => location.pathname === p.path) || PAGES[0]

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="pointer-events-none">
                <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg text-sm font-bold">
                  {strings.brandMark}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{strings.brandName}</span>
                  <span className="text-muted-foreground truncate text-xs">{strings.brandConsole}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{strings.navManage}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {PAGES.map((item) => {
                  const label = strings[item.labelKey]
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.path}
                        tooltip={label}
                      >
                        <NavLink to={item.path}>
                          <item.icon />
                          <span>{label}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-2 px-2 py-1.5">
                <Avatar size="sm">
                  <AvatarFallback>
                    {(admin?.name || admin?.email || strings.brandMark).slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid min-w-0 flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-medium">{admin?.name || strings.fallbackAdminName}</span>
                  <span className="text-muted-foreground truncate text-xs">{admin?.email}</span>
                </div>
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onLogout}>
                <LogOut />
                <span>{strings.navSignOut}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div>
            <p className="text-muted-foreground text-xs">{strings.brandAdminShort}</p>
            <h1 className="text-sm font-semibold leading-none">{strings[active.labelKey]}</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
