import { Link, useLocation } from 'react-router-dom';
import { useTopBar } from '@/contexts/TopBarContext';
import logo from '../../src/assets/Digital_Matter_Logo.png';
import {
  HomeIcon,
  MobileIcon,
  LayersIcon,
  CounterClockwiseClockIcon,
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

function SidePanel() {
  const location = useLocation();
  const { sidePanelState } = useTopBar();

  // Helper to render button content conditionally
  const renderButtonContent = (IconComponent : React.ElementType, text: string) => (
    <>
      <IconComponent className={`${sidePanelState === "expanded" ? "mr-2" : ""} h-6 w-6`} />
      {sidePanelState === "expanded" && text}
    </>
  );

  return (
    <div className={`transition-all ease-in-out duration-300 flex flex-col p-4 space-y-2 items-center ${sidePanelState === "expanded" ? "w-40" : sidePanelState === "condensed" ? "w-20" : "hidden"} bg-card rounded-tr-xl rounded-br-lg`}>
      <div className='m-2'>
        <img src={logo} alt="Logo" className="mb-4 max-w-[36px]" />
      </div>
      {[
        { to: "/Home", icon: HomeIcon, text: "Home" },
        { to: "/Devices", icon: MobileIcon, text: "Devices" },
        { to: "/Firmware", icon: LayersIcon, text: "Firmware" },
        { to: "/Groups", icon: CounterClockwiseClockIcon, text: "Groups" },
      ].map(({ to, icon: Icon, text }) => (
        <Link to={to} key={text} className='w-full'>
          <Button
            variant={location.pathname === to ? "default" : "ghost"}
            size={sidePanelState === "expanded" ? "default" : "icon"}
            className="rounded-lg w-full"
          >
            {renderButtonContent(Icon, text)}
          </Button>
        </Link>
      ))}
    </div>
  );
}

export default SidePanel;
