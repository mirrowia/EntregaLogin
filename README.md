# SegundaPreEntrega

El método GET deberá devolver un objeto con el siguiente formato:
  
* status:success/error  
* payload: Resultado de los productos solicitados  
* totalPages: Total de páginas  
* prevPage: Página anterior  
* nextPage: Página siguiente  
* page: Página actual  
* hasPrevPage: Indicador para saber si la página previa existe  
* hasNextPage: Indicador para saber si la página siguiente existe.  
* prevLink: Link directo a la página previa (null si hasPrevPage=false)  
* nextLink: Link directo a la página siguiente (null si hasNextPage=false)  

## Imagen metodo GET
![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/get.png)

### limit
![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/limit.png)

### page
![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/page.png)

### query
![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/category.png)

![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/stock.png)

### sort
![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/unsorted.png)

![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/sorted1.png)

![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/sorted-1.png)

## Router del carts

### DELETE api/carts/:cid/products/:pid 
![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/deletecartproduct.png)

### PUT api/carts/:cid
![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/putcartproduct.png)

### PUT api/carts/:cid/products/:pid
![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/cartupdatequantity.png)

###  DELETE api/carts/:cid
![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/emptycart.png)

## View de los productos
![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/productlist.png)

## View de un producto
![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/product.png)

## View del cart
![](https://github.com/mirrowia/SegundaPreEntrega/blob/main/imgs/cart.png)


