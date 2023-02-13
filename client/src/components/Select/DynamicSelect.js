import React, { useState, useEffect, useContext } from 'react'
import { taiwan } from 'data/taiwan-data'
import { UserContext } from 'hooks/UserContext'

const DynamicSelect = ({ inputData, setInputData, handleInputChange }) => {
  const { context, setContext } = useContext(UserContext)
  const options = taiwan
  const selectOptionsObj = {
    info: [
      { label: '國家', value: [inputData.nation], att: 'nation' },
      { label: '城市', value: [inputData.city], att: 'city' },
      { label: '區域', value: [inputData.districts], att: 'districts' }
    ]
  }
  useEffect(() => {
    if (context) {
      setInputData({
        ...inputData,
        [inputData.nation]: context.nation,
        [inputData.city]: context.city,
        [inputData.districts]: context.districts
      })
    }
  }, [])
  return (
    <>
      {
        selectOptionsObj.info.map(item => (
          <div key={item.label} className='label-place'>
            <label htmlFor={item.label}>{item.label}</label>
            <select
              name={item.att}
              id={inputData[item.att]}
              onChange={handleInputChange}
              required
            >
              <option value="">--- 請選擇 ---</option>
              {
                item.att === 'nation' &&
                <option value={options.label}>{options.label}</option>

              }
              {
                item.att === 'city' &&
                inputData.nation !== undefined && inputData.nation !== '' &&
                options.info.map(item => (
                  <option key={item.city} value={item.city}>
                    {item.city}
                  </option>
                ))
              }
              {
                item.att === 'districts' &&
                inputData.nation !== '' && inputData.city !== '' &&
                options.info.map(item => (
                  item.city === inputData.city &&
                  item.districts.map(item => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))
                ))
              }
            </select>
          </div>
        ))
      }
    </>
  )
}

export default DynamicSelect
