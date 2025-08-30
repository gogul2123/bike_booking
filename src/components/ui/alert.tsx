// import * as React from "react"
// import { cva, type VariantProps } from "class-variance-authority"

// import { cn } from "@/lib/utils"

// const alertVariants = cva(
//   "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
//   {
//     variants: {
//       variant: {
//         default: "bg-card text-card-foreground",
//         destructive:
//           "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// )

// function Alert({
//   className,
//   variant,
//   ...props
// }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
//   return (
//     <div
//       data-slot="alert"
//       role="alert"
//       className={cn(alertVariants({ variant }), className)}
//       {...props}
//     />
//   )
// }

// function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="alert-title"
//       className={cn(
//         "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function AlertDescription({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="alert-description"
//       className={cn(
//         "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export { Alert, AlertTitle, AlertDescription }
import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

type AlertType = "info" | "success" | "warning" | "error";
interface AlertState {
  show: boolean;
  title: string;
  type: AlertType;
  message: string;
}

interface alertProps {
  alert:AlertState;
  hideAlert: () => void;
  time?:number
}



const Alert = ({
  alert,
  hideAlert, 
  time=5000
}:alertProps) => {
 
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      text: 'text-blue-700',
      icon: <Info className="w-5 h-5 text-blue-500" />,
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-700',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      text: 'text-yellow-700',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-700',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    },
  };

  const alertType = typeof alert?.type === 'string' && alert?.type in styles ? alert.type as keyof typeof styles : 'info';
  const currentStyle = styles[alertType];

  

useEffect(() => {
  if (alert.show) {
    const timer = setTimeout(() => {
      hideAlert();
    }, time);

    return () => clearTimeout(timer);
  }
}, [alert, time, hideAlert]);


  return (
    <div className={`fixed top-20 right-4 p-4 shadow-lg border-l-4 ${currentStyle.bg} ${currentStyle.border} rounded-md flex items-start z-50 w-80 ${alert?.show?"block":"hidden"}`}>
      <div className="flex-shrink-0 mr-3">
        {currentStyle.icon}
      </div>
      <div className="flex-1">
       
        <div className={`text-sm ${currentStyle.text}`}>
          {alert?.message}
        </div>
      </div>
        <button 
          onClick={hideAlert}
          className={`ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentStyle.text} focus:ring-offset-${currentStyle.bg.split('-')[1]}-50 focus:ring-${currentStyle.text.split('-')[1]}-500`}
        >
          <span className="sr-only">Dismiss</span>
          <X className="w-4 h-4" />
        </button>
    </div>
  );
};

export default Alert;