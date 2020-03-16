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
        const name = doc.data.name
        console.log(doc.data)
        var imgSrc = ""
        if (doc.data.gel === 0 && doc.data.mass === 0) {
          imgSrc = "https://firebasestorage.googleapis.com/v0/b/covid19-1013d.appspot.com/o/hm_Red.png?alt=media&token=1c543ba0-5260-4344-85bc-c9fff8bf7bcf"
        }
        else if (doc.data.gel !== 0 && doc.data.mass === 0) {
          imgSrc = "https://firebasestorage.googleapis.com/v0/b/covid19-1013d.appspot.com/o/hm_GreedRed.png?alt=media&token=a8b4204d-1e1f-496e-a511-84ccf79b62f9"
        }
        else if (doc.data.gel === 0 && doc.data.mass !== 0) {
          imgSrc = "https://firebasestorage.googleapis.com/v0/b/covid19-1013d.appspot.com/o/hm_RedGreen.png?alt=media&token=422fb07b-894b-42a7-a422-25bd8812c595"
        }
        else {
          imgSrc = "https://firebasestorage.googleapis.com/v0/b/covid19-1013d.appspot.com/o/hm_Green.png?alt=media&token=3bb82f1c-d8c7-48d2-8976-7860621a0243"
        }
        var marker = new longdo.Marker({ lon: location.lng, lat: location.lat }, {
          title: name,
          icon: {
            html: `<img 
            src="${imgSrc}"
            style="width:auto;height:100px;transform: translate(0,-50%)" />`,
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
    map.Ui.Zoombar.visible(true)
    map.Ui.Geolocation.visible(false)
    map.Ui.Toolbar.visible(false)
    map.Ui.LayerSelector.visible(true)
    map.Ui.Fullscreen.visible(false)
    map.Ui.Scale.visible(false)

  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <LongdoMap id="longdo-map" mapKey="f1827b0cf87933bf82cdb99110141e47" callback={initMap} />
    </div>
  );
}
