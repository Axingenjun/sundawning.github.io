/*
 * Copyright (C) 2019-2021 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeoCoordinates } from "@here/harp-geoutils";

import { View } from "./View";

const app = new View({
    canvas: document.getElementById("map") as HTMLCanvasElement
});

const mapView = app.mapView;

// make map full-screen
mapView.resize(window.innerWidth, window.innerHeight);

// react on resize events from the browser.
window.addEventListener("resize", () => {
    mapView.resize(window.innerWidth, window.innerHeight);
});

// center the camera to New York
// 查找经纬度，https://www.latlong.net/
mapView.lookAt({ target: new GeoCoordinates(22.606020,113.998273), zoomLevel: 17, tilt: 40 });

// make sure the map is rendered
mapView.update();
