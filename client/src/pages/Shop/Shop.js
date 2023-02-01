import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Shop.scss'

import FilterBar from './components/FilterBar/'
import ProductList from './components/ProductList/'
import SearchBar from './components/SearchBar/'
import Placeholder from 'components/Placeholder/Placeholder'

import SortBar from './components/SortBar/'
// data
import { data } from './data/'

const Shop = () => {
  const [products, setProducts] = useState([])
  // 排序、搜尋後的資料
  const [displayProducts, setDisplayProducts] = useState([])

  const [categories, setCategories] = useState([])
  const categoryMenu = ['戶外遠足', '登山露營', '背包收納', '電子類別', '旅行配件']

  const [priceRange, setPriceRange] = useState([0, 10000])


  // 載入spinner
  const [isLoading, setIsLoading] = useState(false)

  const [sortBy, setSortBy] = useState('')
  const [searchWord, setSearchWord] = useState('')

  // x秒後自動關掉spinner(設定isLoading為false)
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [isLoading])

  // Spinner
  const spinner = (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-warning" role="status" >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
  useEffect(() => {
    setIsLoading(true)
    setProducts(data)
    setDisplayProducts(data)
  }, [])

  useEffect(() => {

    setIsLoading(true)

    let newProducts = [...products]

    newProducts = handleSearch(newProducts, searchWord)
    newProducts = handleSort(newProducts, sortBy)
    newProducts = handleCategories(newProducts, categories)
    newProducts = handlePriceRange(newProducts, priceRange)

    setDisplayProducts(newProducts)
  }, [products, sortBy, searchWord, categories, priceRange])


  // 排序邏輯
  const handleSort = (products, sortBy) => {
    const newProducts = [...products]

    // 少到多
    if (sortBy === '1') {
      newProducts.sort((a, b) =>
        a.price - b.price
      )
    }
    // 多到少
    if (sortBy === '2') {
      newProducts.sort((a, b) =>
        b.price - a.price
      )
    }
    // 預設id
    if (sortBy === '' && newProducts.length > 0) {
      newProducts.sort((a, b) => a.id - b.id)
    }
    return newProducts
  }

  const handleSearch = (products, searchWord) => {
    let newProducts = [...products]

    if (searchWord.length) {
      newProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchWord.toLowerCase())
      })
    }
    return newProducts
  }

  const handleCategories = (products, categories) => {
    let newProducts = [...products]

    if (categories.length > 0) {
      newProducts = [...newProducts].filter((product) => {
        let isFound = false
        const productCategories = product.categories.split(',')

        for (let i = 0; i < categories.length; i++) {
          if (productCategories.includes(categories[i])) {
            isFound = true
            break
          }
        }
        return isFound
      })
    }
    return newProducts
  }

  const handlePriceRange = (products, priceRange) => {
    let newProducts = [...products]
    console.log(products)

    newProducts = products.filter((p) => {
      return p.price >= priceRange[0] && p.price <= priceRange[1]
    })
    return newProducts
  }

  return (
    <>
      <div className="container">

        <div className='search-bar'>
          <SearchBar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
          />
        </div>

        <div className="col-md-12">
          <div className="row">

            <div className="col-md-3">
              <FilterBar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                categoryMenu={categoryMenu}
                categories={categories}
                setCategories={setCategories}
              />
            </div>

            <div className="col-md-9">

              <div className="d-flex justify-between">
                <h5>商品列表</h5>

                <SortBar sortBy={sortBy} setSortBy={setSortBy} />

              </div>
              <hr />
              <br />
              {isLoading
                ? (
                  <Placeholder />
                )
                : (
                  <ProductList products={displayProducts} />
                )}
            </div>

          </div>
        </div>

      </div>
    </>
  )



  // const [loader, setLoader] = useState(false)

  // const getUsers = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://my-json-server.typicode.com/eyesofkids/json-fake-data/users'
  //     )
  //     console.log(response.data)

  //     if (Array.isArray(response.data)) {
  //       setUsers(response.data)
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // useEffect(() => {
  //   setLoader(true)
  //   getUsers()
  // }, [])

  // // 自動於2秒後關閉載入指示動畫
  // useEffect(() => {
  //   if (loader) {
  //     setTimeout(() => {
  //       setLoader(false)
  //     }, 2000)
  //   }
  // }, [loader])

  // const loaderIcon = (
  //   <div className="d-flex justify-content-center">
  //     <div className="spinner-border text-danger" role="status">
  //       <span className="visually-hidden">Loading...</span>
  //     </div>
  //   </div>
  // )
  // /*
  // 放在index.html header
  // <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
  //   integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
  // */

  // const display = (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>ID</th>
  //         <th>產品</th>
  //         <th>敘述</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {users.map((v, i) => {
  //         return (
  //           <tr key={v.id}>
  //             <td>{v.id}</td>
  //             <td>{v.name}</td>
  //             <td>{v.age}</td>
  //           </tr>
  //         )
  //       })}
  //     </tbody>
  //   </table>
  // )
  // return <>
  //   <div className='shop-content'>
  //     <h1>暫存</h1>
  //     {loader ? loaderIcon : display}
  //     {/* {display} */}
  //   </div>
  // </>
}

export default Shop
