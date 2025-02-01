// biome-ignore lint/style/useImportType: <explanation>
import { ComponentProps, forwardRef } from "react";

// biome-ignore lint/style/useImportType: <explanation>
import { Container } from "./styles";

type ButtonProps = ComponentProps<'button'> & {
    variant?: 'default' | 'outline';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (
    { children, variant = 'default', ...props },
    ref,
) {
    return (
        <Container {...props} ref={ref} $variant={variant}>
            {children}
        </Container>
    );
});
