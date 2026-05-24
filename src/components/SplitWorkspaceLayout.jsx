import { motion } from 'framer-motion';
import Navbar from './Navbar.jsx';
import { cn } from '@/lib/utils';

const columnVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function SplitWorkspaceLayout({
  variant = 'rojo',
  title,
  breadcrumbs,
  header,
  left,
  leftFooter,
  right,
  className,
}) {
  return (
    <div
      className={cn(
        'split-workspace split-layout min-h-screen lg:h-screen flex flex-col lg:overflow-hidden',
        `split-workspace--${variant}`,
        className,
      )}
    >
      <div className="split-workspace__ambient" aria-hidden="true">
        <div className="split-workspace__noise" />
        <div className="split-workspace__glow split-workspace__glow--left" />
        <div className="split-workspace__glow split-workspace__glow--right" />
        <div className="split-workspace__glow split-workspace__glow--center" />
      </div>

      <div className="split-workspace__content flex flex-col flex-1 min-h-0">
        <Navbar title={title} breadcrumbs={breadcrumbs} center={header} />

        <div className="relative flex-1 min-h-0 min-w-0 p-xl">
          <div className="grid h-full min-h-0 min-w-0 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] gap-xl">
            <motion.div
              className="split-layout__col flex flex-col gap-xl min-h-0 min-w-0 h-full overflow-hidden"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={columnVariants}
            >
              {left}
              {leftFooter}
            </motion.div>

            <motion.div
              className="split-layout__col flex flex-col gap-xl min-h-0 min-w-0 h-full overflow-x-hidden overflow-y-auto"
              custom={0.1}
              initial="hidden"
              animate="visible"
              variants={columnVariants}
            >
              {right}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
