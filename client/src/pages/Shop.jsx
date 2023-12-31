/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {useAction} from "../hooks/useAction";
import {fetchBrand, fetchDevice, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import {useSelector} from "react-redux";
import { toast } from 'react-toastify';

const Shop = () => {
    const {ASetTypes, ASetBrands, ASetDevices, ASetTotalCount, ASetBasketCount, ASetRating, ASetRatingCount} = useAction()
    const {isPage, isLimit, isSelectedType, isSelectedBrand} = useSelector(state => state.deviceReducer)
    const {isUserId} = useSelector(state => state.userReducer)

    useEffect(() => {
        fetchTypes().then(data => ASetTypes(data)).catch(e => toast.error("ERROR: fetch types"))
        fetchBrand().then(data => ASetBrands(data)).catch(e => toast.error("ERROR: fetch brands"))
    }, [])

    useEffect(() => {
        fetchDevice(isSelectedType, isSelectedBrand, isPage, isLimit, isUserId)
            .then(data => {
                ASetDevices(data.device.rows)
                ASetTotalCount(data.device.count)
                ASetBasketCount(data.countData)
                ASetRating(data.ratingByDevice)
                ASetRatingCount(data.ratingByCount)
            }).catch(e => toast.error("ERROR: fetch devices"))
    }, [isSelectedType, isSelectedBrand, isPage])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={2}>
                    <TypeBar />
                </Col>
                <Col md={10}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;