import React, {useState} from "react";
import {BlocksSelectorProp} from "./types";
import './index.scss'
import {useStores} from "../../store/page/context";
import {Button} from "../../components-blocks/Button";
import { Modal } from "../../components-infrastructure/Modal";
import button from '../../blocks/Button.json'
import {Alignment, BlockGeneratedObject} from "../../types/blocks";
import {WithLabel} from "../../components-infrastructure/WithLabel";
import {Select} from "../../components-infrastructure/Size";
import {Input} from "../../components-infrastructure/Input";
import {observer} from "mobx-react-lite";
import {InBox} from "../../components-infrastructure/InBox";

export const BlocksSelector: React.FC<BlocksSelectorProp> = observer(({
    blockId,
    layerId
}) => {
    const {pageLayout} = useStores()
    const store = useStores()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const blockType = pageLayout[layerId][blockId]
    const isProps = blockType && 'props' in blockType
    const onModalToggle = () => {
        if (isModalOpen) {
            console.log(`Component name: ${blockType.name}`, `Component ID: ${blockId}`, `Component data: ${blockType.props}`)
        }
        setIsModalOpen(!isModalOpen)
    }

    if (!isProps) return <></>
    switch (blockType.name) {
        case 'Button':
            return <>
                <Button {...blockType.props} onClick={onModalToggle} id={blockId}/>
                {isModalOpen && <Modal setIsModalOpen={onModalToggle} anchorId={blockId} title={`${blockType.name}`}>
                    {
                        (button as BlockGeneratedObject[]).map((prop) => {
                            return <React.Fragment key={prop.name}>
                                {
                                    prop.control !== 'inbox' ? <div className={'item-wrapper'}>
                                        <WithLabel label={prop.label}>
                                            {
                                                prop.control === 'select' ?
                                                    <Select options={prop.options || []}
                                                            active={blockType.props[prop.name]}
                                                            onChange={(value) => {
                                                                store.updateComponentProp(layerId, blockId, prop.name, value)
                                                            }}
                                                    /> : prop.control === 'input' ?
                                                        <Input value={blockType.props[prop.name]}
                                                               onChange={(value) => {
                                                                   store.updateComponentProp(layerId, blockId, prop.name, value)
                                                               }}
                                                        /> : <></>
                                            }
                                        </WithLabel>
                                    </div> : <></>
                                }
                            </React.Fragment>
                        })
                    }
                    <div className={'alignment-modal-data'}>
                        {
                            (button as BlockGeneratedObject[]).map((prop) => {
                                return <React.Fragment key={prop.name}>
                                    {
                                        prop.control === 'inbox' ?
                                            <InBox type={prop.name as 'justify' | 'align'}
                                                   active={blockType.props[prop.name]}
                                                   options={prop.options as Alignment[]}
                                                   onChange={(value) => {
                                                       store.updateComponentProp(layerId, blockId, prop.name, value)
                                                   }}
                                            /> : <></>
                                    }
                                </React.Fragment>
                            })
                        }
                    </div>
                </Modal>}
            </>
        default:
            return <></>

    }
})