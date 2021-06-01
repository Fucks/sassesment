import { FunctionComponent } from "react";
import AtlassianEmptyState from '@atlaskit/empty-state';
import NotImplementedYetImg from '../../assets/sketch.png';

export interface NotImplementedYetProps {}

const NotImplementedYet: FunctionComponent<NotImplementedYetProps> = () => {

    const notImplemented = {
        header: 'Oops, parece que isso ainda não existe!',
        description: `Pedimos desculpas pelo transtorno mas parece que esse recurso ainda está em fase de desenvolvimento, logo logo você podera aproveitar de todo esse conteúdo.`,
        imageUrl: NotImplementedYetImg
    };

    return (<AtlassianEmptyState  {...notImplemented} />);
}

export default NotImplementedYet;