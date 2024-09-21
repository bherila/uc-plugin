'use client'
import Accordion from 'react-bootstrap/Accordion'
import AccordionButton from 'react-bootstrap/esm/AccordionButton'
import AccordionItem from 'react-bootstrap/esm/AccordionItem'
import AccordionCollapse from 'react-bootstrap/AccordionCollapse'
import { ShopifyOfferMetafields } from '@/lib/ShopifyOfferMetafields'
import React from 'react'

export default function MetafieldsClient(props: {
  metafields: ShopifyOfferMetafields | null
}) {
  const { metafields } = props
  return (
    metafields && (
      <Accordion defaultActiveKey="-1" className="mb-3">
        <AccordionItem eventKey="0">
          <AccordionButton>
            <h5>Metafields</h5>
          </AccordionButton>
          <AccordionCollapse eventKey="0">
            <div>
              <h3>offer_v3</h3>
              <textarea
                style={{ width: '100%', height: '100px' }}
                defaultValue={metafields?.offerV3}
              />

              <h3>offer_v3_array</h3>
              <textarea
                style={{ width: '100%', height: '100px' }}
                defaultValue={metafields?.offerV3Array}
              />
            </div>
          </AccordionCollapse>
        </AccordionItem>
      </Accordion>
    )
  )
}
