import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white shadow-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
        <div className="flex w-full items-center justify-between gap-1 px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-slate-600 hover:text-slate-900" />
            <Separator
              orientation="vertical"
              className="mx-2 h-4 data-[orientation=vertical]:h-4"
            />
            <span className="text-sm text-gray-500">Admin Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">Welcome, Admin</div>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
