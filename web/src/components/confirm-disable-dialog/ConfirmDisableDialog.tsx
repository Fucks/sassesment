import { FunctionComponent, useState } from "react";
import Modal from '@atlaskit/modal-dialog';

export interface ConfirmDisableDialogProps {
    isOpen: boolean;
    onConfirm: () => Promise<void>;
    onClose: () => void;
}

const ConfirmDisableDialog: FunctionComponent<ConfirmDisableDialogProps> = ({ isOpen, onConfirm, onClose }: ConfirmDisableDialogProps) => {

    const [loading, setLoading] = useState<boolean>(false);

    if (!isOpen) {
        return <></>;
    }

    const onClickConfirm = async () => {

        setLoading(true);

        await onConfirm();

        setLoading(false);
    }

    return (<Modal
        actions={[{ text: 'Sim, desativar', isLoading: loading, onClick: onClickConfirm }, { text: 'Cancelar', onClick: onClose }]}
        heading="Deseja desativar o registro?"
        appearance="danger">
        O registro vai ser desativado permanentemente. Deseja realmente continuar?
    </Modal>);
}

export default ConfirmDisableDialog;