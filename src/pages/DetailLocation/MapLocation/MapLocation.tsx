import React from 'react'

type Props = {}

const MapLocation = (props: Props) => {
  return (
    <div>
       <div style={{ width: `100%`, height: `100%` }}>
      <iframe
        src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.3382536588!2d106.4150395052842!3d10.755341073300812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1664304816248!5m2!1sen!2s" 
        width={`100%`}
        height={`550px`}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
    </div>
    
  )
}

export default MapLocation;