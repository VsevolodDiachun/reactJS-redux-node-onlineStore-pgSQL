/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useSelector} from "react-redux";
import DeviceItem from "./DeviceItem";
import {useEffect} from "react";
import {devicesFromBasket, fetchBrand} from "../http/deviceAPI";
import {useAction} from "../hooks/useAction";
import {Row} from "react-bootstrap";
import { toast } from 'react-toastify';

const DeviceList = () => {
    const {isUserId} = useSelector(state => state.userReducer)
    const {isDevices} = useSelector(state => state.deviceReducer)
    const {ASetBasket, ASetBasketCount, ASetBrands} = useAction()

    useEffect(() => {
        if (isUserId) {
            devicesFromBasket({id: isUserId})
                .then(data => {
                    ASetBasket(data.devicesData);
                    ASetBasketCount(data.countData)
                })
                .catch(e => toast.error("ERROR: fetch device from basket"))
        }
    }, [isUserId])

    useEffect(() => {
        fetchBrand().then(data => ASetBrands(data))
    }, [isUserId])

    return (
        <div className="d-flex flex-wrap">
            {isDevices.map(device =>
                <Row key={device.id}>
                    <DeviceItem device={device}/>
                </Row>
            )}
        </div>
    );
};

export default DeviceList;