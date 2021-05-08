import { AvatarItem, Skeleton } from "@atlaskit/avatar";
import { SkeletonItem } from "@atlaskit/side-navigation";
import { FunctionComponent } from "react";
import { ListItem } from "../layout/ListContainerLayout";

export interface ListLoadingProps {

}

const ListLoading: FunctionComponent<ListLoadingProps> = () => {
    return (<>{[1, 1, 1, 1, 1, 1, 1, 1, 1].map(e => (<ListItem><AvatarItem primaryText={<SkeletonItem />} avatar={<Skeleton />} /></ListItem>))}</>);
}

export default ListLoading;