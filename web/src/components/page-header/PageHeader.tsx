import styled from "styled-components";
import AtlassianPageHeader from "@atlaskit/page-header";

const PageHeader = (props: any) => (
    <Container>
        <AtlassianPageHeader {...props}>
            {props.children}
        </AtlassianPageHeader>
    </Container>
)

export default PageHeader;

const Container = styled.div`
    padding: 24px 64px 0;
    background: #FAFBFC;
    margin: 0;
    border-bottom: 1px solid rgb(235, 236, 240);

    div:first-child{
        margin: 0;
    }
`;
