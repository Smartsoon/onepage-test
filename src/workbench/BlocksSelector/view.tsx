import React, {useState} from "react";
import {BlocksSelectorProp} from "./types";
import './index.scss'
import {useStores} from "../../store/page/context";
import {Button} from "../../components-blocks/Button";
import { Modal } from "../../components-infrastructure/Modal";
import button from '../../blocks/Button.json'
import {BlockGeneratedObject} from "../../types/blocks";
import {WithLabel} from "../../components-infrastructure/WithLabel";
import {Select} from "../../components-infrastructure/Size";
import {Input} from "../../components-infrastructure/Input";
import {observer} from "mobx-react-lite";

export const BlocksSelector: React.FC<BlocksSelectorProp> = observer(({
    blockId,
    layerId
}) => {
    const {pageLayout} = useStores()
    const store = useStores()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const blockType = pageLayout[layerId][blockId]
    const isProps = blockType && 'props' in blockType
    if (!isProps) return <></>
    switch (blockType.name) {
        case 'Button':
            return <>
                <Button {...blockType.props} onClick={() => setIsModalOpen(!isModalOpen)} id={blockId}/>
                {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} anchorId={blockId} title={`${blockType.name}`}>
                    <div>
                        <p>Component ID: </p>
                        <span>{blockId}</span>
                    </div>
                    {
                        (button as BlockGeneratedObject[]).map((prop, index) => {
                            return <WithLabel key={index} label={prop.label}>
                                {
                                    prop.control === 'select' ?
                                        <Select options={prop.options || []}
                                                active={blockType.props[prop.name]}
                                                onChange={(value) => {
                                                    store.updateComponentProp(layerId, blockId, prop.name, value)
                                                }}
                                        /> :
                                        <Input value={blockType.props[prop.name]}
                                               onChange={(value) => {
                                                   store.updateComponentProp(layerId, blockId, prop.name, value)
                                               }}
                                        />
                                }
                            </WithLabel>
                        })
                    }
                </Modal>}
            </>
        default:
            return <></>

    }
})