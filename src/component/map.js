import React from "react";
import { longdo, map, LongdoMap } from '../API/LongdoMap'
import axios from 'axios'

export default function Maps(props) {
  function initMap() {
    map.location(longdo.LocationMode.Geolocation)

    axios.defaults.baseURL = "https://us-central1-covid19-1013d.cloudfunctions.net/app"
    axios.get('/api/allShop').then(res => {
      const datas = res.data
      datas.forEach(doc => {
        const location = doc.data.location
        // const gel = doc.data.gel
        // const mask = doc.data.mass
        const name = doc.data.name
        console.log(doc.data)
        var marker = new longdo.Marker({ lon: location.lng, lat: location.lat }, {
          title: name,
          icon: {
            html: `
              <h3 style="background-color: powderblue;padding:10px"> Hell </h3>
            `,
            offset: { x: 12, y: 45 }
          },
          popup: {
            html:
              `
              <h1> Hello world </h1>            
            `
          }
        })
        map.Overlays.add(marker)
      })
    })

    map.Ui.DPad.visible(false)
    map.Ui.Zoombar.visible(false)
    map.Ui.Geolocation.visible(false)
    map.Ui.Toolbar.visible(false)
    map.Ui.LayerSelector.visible(false)
    map.Ui.Fullscreen.visible(false)
    map.Ui.Scale.visible(false)

  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <LongdoMap id="longdo-map" mapKey="f1827b0cf87933bf82cdb99110141e47" callback={initMap} />
    </div>
  );
}
