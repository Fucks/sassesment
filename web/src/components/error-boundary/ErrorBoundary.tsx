import Banner from "@atlaskit/banner";
import { FunctionComponent } from "react";
import ErrorIcon from '@atlaskit/icon/glyph/error';

const ErrorBoundary: FunctionComponent = (props) => {
    try {
        return <>{props.children}</>;
    }
    catch (err) {
        return (
            <Banner
                appearance="error"
                icon={<ErrorIcon label="" secondaryColor="inherit" />}
                isOpen>
                Um erro inesperado aconteceu.
            </Banner>
        )
    }
}

export default ErrorBoundary;