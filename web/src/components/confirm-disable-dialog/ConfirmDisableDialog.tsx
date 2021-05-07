import { FunctionComponent } from "react";
import Modal from '@atlaskit/modal-dialog';

export interface ConfirmDisableDialogProps {
    isOpen: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmDisableDialog: FunctionComponent<ConfirmDisableDialogProps> = ({ isOpen, onConfirm, onClose }: ConfirmDisableDialogProps) => {

    if (!isOpen) {
        return <></>;
    }

    return (<Modal
        actions={[{ text: 'Sim, desativar', onClick: onConfirm }, { text: 'Cancelar' }]}
        onClose={onClose}
        heading="Deseja desativar o registro?"
        appearance="danger">
        O registro vai ser desativado permanentemente. Deseja realmente continuar?
    </Modal>);
}

export default ConfirmDisableDialog;