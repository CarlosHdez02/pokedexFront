import React from "react";
import { ButtonInterface } from "../../interfaces/ButtonInterface";

export const Button: React.FC<ButtonInterface> = ({ clickHandler, children, ...props }) => {
    return (
        <button onClick={clickHandler} {...props}>
            {children}
        </button>
    );
};
