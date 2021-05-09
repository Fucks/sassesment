import { FunctionComponent } from "react";
import AtlassianEmptyState from '@atlaskit/empty-state';
import NoResultsImg from '../../assets/no-results-found.png';
import Button from "@atlaskit/button";

export interface EmptyStateProps {
    onNewAction: () => void
}

const EmptyState: FunctionComponent<EmptyStateProps> = ({onNewAction}: EmptyStateProps) => {

    const empty = {
        header: 'Nenhum resultado encontrado',
        description: `Nenhum registro foi encontrado na nossa base de dados com os filtros informados, 
                    refaça sua busca ou clique no botão abaixo para criar um novo registro.`,
        imageUrl: NoResultsImg,
        primaryAction: <Button appearance="primary" onClick={onNewAction}>Cadastrar novo registro</Button>
    };

    return (<AtlassianEmptyState  {...empty} />);
}

export default EmptyState;