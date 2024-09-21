'use client'
import { ShopifyOfferMetafields } from '@/server_lib/maybeUpdateOfferMetafield'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionCollapse,
} from 'react-bootstrap'
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
              <textarea style={{ width: '100%', height: '100px' }}>
                {metafields?.offerV3}
              </textarea>

              <h3>offer_v3_array</h3>
              <textarea style={{ width: '100%', height: '100px' }}>
                {metafields?.offerV3Array}
              </textarea>
            </div>
          </AccordionCollapse>
        </AccordionItem>
      </Accordion>
    )
  )
}
