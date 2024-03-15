import React from "react";
import {ElementsCreatorProp} from "./types";
import './index.scss'
import {BaseLayout} from "../../layouts/BaseLayout";
import {useStores} from "../../store/page/context";
import {InfrastructureButton} from "../../components-infrastructure/InfrastructureButton";
import {BlocksSelector} from "../BlocksSelector";
import { v4 } from 'uuid'
import {ButtonProps} from "../../components-blocks/Button";
import button from '../../blocks/Button.json'
import {useObserver} from "mobx-react-lite";

export const ElementsCreator: React.FC<ElementsCreatorProp> = () => {
    const store = useStores()
    const onCreateButton = () => {
        const id = v4()
        const componentProps: ButtonProps = button.reduce((acc, prop) => {
            return {
                ...acc,
                [prop.name]: prop.value
            }
        }, {})
        store.addLayerComponent(
            'layerId', id, {
                name: 'Button',
                props: componentProps
            })
    }

    const onRemoveComponents = () => {
        store.removeAllComponents('layerId')
    }

    return useObserver(() => <div className={'elements-creator'}>
        <InfrastructureButton
            label={'Add Button Components'}
            onClick={onCreateButton}
            style={{marginBottom: 20}}
        />
        <InfrastructureButton
            variant={'danger'}
            label={'Remove All Components'}
            onClick={onRemoveComponents}
        />
        <div className={'elements-creator__layer'}>
            {
                Object.entries(store.pageLayout)?.map(layout => {
                    return <BaseLayout key={layout[0]}>
                        {Object.entries(layout[1]).map(component => {
                            return <BlocksSelector key={layout[0]} layerId={layout[0]} blockId={component[0]}/>
                        })}
                    </BaseLayout>
                })
            }
        </div>
    </div>)
}