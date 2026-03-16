import React, { Component } from 'react'

export class NevLogo extends Component {
  render() {
    return (
        <svg
         viewBox="120 140 260 260 " 
        className="w-12 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full shadow-md " >
        
        <polyline points="242,142 300,160 280,180 280,200 270,195 260,194 249,192 230,194 210,200 210,180 200,173 198,177 198,180 200,190 193,190 196,180 199,177 198,172 190,165 240,142" stroke="black"></polyline>
        <circle  r="41" cx="245" cy="225" stroke="white" strokewidth="3" fill="orange" ></circle>
        <polyline points="216,251 224,271 269,271 216,251" stroke="black"></polyline>
        <polyline points="170,280 192,311 237,322 242,328  241,320  230,300 170,280 " stroke="black"></polyline>
        <polyline points="255,299 242,328 248,322 310,311 329,280 " stroke="black"></polyline>
        <line x1="178" y1="275" x2="243" y2="298" stroke="black" strokewidth="3"></line>
        <line x1="186" y1="268" x2="243" y2="298" stroke="black" strokwidth="3"></line>
        <line x1="318" y1="273" x2="243" y2="298"   stroke="black" strokewidth="3"></line>
        <line x1="300" y1="265" x2="243" y2="298" stroke="black" strokewidth="3"></line>
        <line x1="192" y1="262" x2="243" y2="298"   stroke="black" strokewidth="3"></line>
        <line x1="287" y1="262" x2="243" y2="298" stroke="black" strokewidth="3"></line>
        <polyline points=" 166,288 185,318 241,331 164,331 166,288" stroke="black"></polyline>
        <polyline points=" 333,288 315,318 241,331 335,331" stroke="black"></polyline>
        <text x="193" y="308" font-size="13" fill="white">Study</text>
        <text x="228" y="228" font-size="18" fill="white">Hub</text>
        <text x="273" y="308" font-size="13" fill="white">Note</text>
        <line x1="224" y1="233" x2="222" y2="245"  stroke="black"></line>
        <line x1="260" y1="233" x2="262" y2="245"  stroke="black"></line>
        <polyline points="224,239 243,250 260,239 224,239" stroke="black" fill="red"></polyline>
        <text x="143" y="359" font-family="Algerian" font-size="27" fill="red">StudyHubNote</text>
        <polyline points="173,245 183,215 191,245 169,227 198,228 173,245" stroke="red" fill="green"></polyline>
    </svg>

    )
  }
}

export default NevLogo