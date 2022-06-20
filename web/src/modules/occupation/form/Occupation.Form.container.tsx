import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import FormContainerLayout from "../../../components/layout/FormContainerLayout";
import OccupationSchema from "./Occupation.Schema";
import styled from "styled-components";
import { Occupation, OccupationService } from "../../../services/occupation/occupation.service";
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Banner from "@atlaskit/banner";
import FormField from "../../../components/form-field/FormField";
import ConfirmDisableDialog from "../../../components/confirm-disable-dialog/ConfirmDisableDialog";
import { Formik } from "formik";
import { ActionItem, SvgSaveIcon } from "../../../components/page-header/PageHeader";
import Icon from "@atlaskit/icon";
export interface OccupationFormContainerProps {
}

const OccupationFormContainer: FunctionComponent<OccupationFormContainerProps> = (props) => {

    const service = new OccupationService();

    const { id } = useParams<any>();

    const breacrumbs = ["Ocupações", "Formulário", id ? 'Editar' : 'Cadastrar'];

    const FormTitle = (
        id ? 'Editar ocupação' : 'Cadastrar nova ocupação'
    );

    const [formValues, setFormValues] = useState<Occupation>({ name: '' });
    const [submiting, setSubmiting] = useState(false);

    const [error, setError] = useState<any | null>(null);
    const [showDisablePopup, setShowDisablePopup] = useState(false);

    const history = useHistory();

    useEffect(() => {

        if (id != null) {
            initFormWithValues();
        }

    }, []);

    const initFormWithValues = async () => {

        setSubmiting(true);

        var data = await service.getById(id);

        setFormValues(data);

        setSubmiting(false);
    }

    const handleSave = async (values: Occupation) => {

        setSubmiting(true);

        try {

            if (id != null) {
                await service.update(id, values);
            }
            else {
                await service.create(values);
            }

            await new Promise((resolve) => { setTimeout(() => { history.push('/occupation'); resolve(null) }, 3000) })
        }
        catch (err) {
            setError(err);
        }
        finally {
            setSubmiting(false);
        }
    }

    const handleDisableEntity = async () => {

        try {
            await service.disable(id);
            await new Promise((resolve) => setTimeout(() => { history.push('/occupation'); resolve(null) }, 1000))
        }
        catch (err) {
            setError(err);
            setShowDisablePopup(false);
        }
    }

    const actions: ActionItem[] = useMemo(() => [
        id && {
            onClick: () => setShowDisablePopup(true),
            appearance: "danger",
            label: 'Desativar'
        },
        {
            type:"submit",
            appearance:"primary",
            isLoading: submiting,
            icon: <Icon glyph={SvgSaveIcon} label="" size="small" primaryColor="#172B4D"  />,
            label: 'Salvar'
        }


    ].filter(e => e), [submiting]);

const form = {
    initialValues: formValues,
    validationSchema: OccupationSchema,
    onSubmit: handleSave
}

return (
    <Formik {...form}>
        {(props) => (
            <form onSubmit={props.handleSubmit}>
                <FormContainerLayout
                    title={FormTitle}
                    onBackAction={() => history.goBack()}
                    actions={actions}
                    breadcrumbs={breacrumbs}>
                    {error &&
                        <Banner
                            appearance="error"
                            icon={<ErrorIcon label="" secondaryColor="inherit" />}
                            isOpen>
                            {(error as any).message}
                        </Banner>
                    }
                    <div>
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <FormField name="name" value={formValues.name} label="Nome da ocupação" />
                            </div>
                        </div>
                    </div>
                    <ConfirmDisableDialog isOpen={showDisablePopup} onClose={() => setShowDisablePopup(false)} onConfirm={handleDisableEntity} />
                </FormContainerLayout>
            </form>
        )}
    </Formik>
);

}

export default OccupationFormContainer;