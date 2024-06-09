import { ButtonHTMLAttributes } from "react";

export interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
    clickHandler?: () => void;
    children?: React.ReactNode;
}
