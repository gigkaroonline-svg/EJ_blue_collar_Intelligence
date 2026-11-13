import { useState } from 'react'
import { Building2, HardHat, LogOut, Newspaper, Users } from 'lucide-react'
import { PartnersPage } from '@/pages/PartnersPage.jsx'
import { CompaniesPage } from '@/pages/CompaniesPage.jsx'
import { WorkersPage } from '@/pages/WorkersPage.jsx'
import { BlogsPage } from '@/pages/BlogsPage.jsx'
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

const PAGES = [
  { id: 'partners', label: 'Sourcing partners', icon: Users },
  { id: 'companies', label: 'Companies', icon: Building2 },
  { id: 'workers', label: 'Labours', icon: HardHat },
  { id: 'blogs', label: 'Blogs', icon: Newspaper },
]

export function Shell({ admin, onLogout }) {
  const [page, setPage] = useState('partners')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const active = PAGES.find((p) => p.id === page)

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="pointer-events-none">
                <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg text-sm font-bold">
                  R
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">RojMitra</span>
                  <span className="text-muted-foreground truncate text-xs">Admin console</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Manage</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {PAGES.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={page === item.id}
                      tooltip={item.label}
                      onClick={() => setPage(item.id)}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
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
                    {(admin?.name || admin?.email || 'A').slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid min-w-0 flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-medium">{admin?.name || 'Admin'}</span>
                  <span className="text-muted-foreground truncate text-xs">{admin?.email}</span>
                </div>
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onLogout}>
                <LogOut />
                <span>Sign out</span>
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
            <p className="text-muted-foreground text-xs">Admin</p>
            <h1 className="text-sm font-semibold leading-none">{active?.label}</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          {page === 'partners' ? <PartnersPage /> : null}
          {page === 'companies' ? <CompaniesPage /> : null}
          {page === 'workers' ? <WorkersPage /> : null}
          {page === 'blogs' ? <BlogsPage /> : null}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
