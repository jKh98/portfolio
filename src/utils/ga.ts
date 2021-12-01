import ReactGA from "react-ga";

export const event = (category: string, action: string, label?: string) => {
    ReactGA.event({  category,
        action,
        label,
        value: 1
      });
    }
