'use client'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react'
import { usePageHook } from './page-hook'
import { ProductPurchaseForm } from '../_components/form'
import { FormProvider } from 'react-hook-form'

const FORM_ID = 'purchase-create-form'

export default function PurchaseFormPage() {
  const { handleSubmit, handleCancel, formContextValue } = usePageHook()

  return (
    <FormProvider {...formContextValue}>
      <div className="mx-auto max-w-xl">
        <Card>
          <CardHeader>Tambah Data Pengadaan Stok</CardHeader>

          <CardBody>
            <ProductPurchaseForm
              id={FORM_ID}
              onSubmit={() => {
                handleSubmit().catch(e => {
                  throw e
                })
              }}
            />
          </CardBody>

          <CardFooter className="justify-end">
            <Button variant="light" color="primary" onClick={handleCancel}>
              Batal
            </Button>

            <Button form={FORM_ID} type="submit" color="primary">
              Simpan
            </Button>
          </CardFooter>
        </Card>
      </div>
    </FormProvider>
  )
}
