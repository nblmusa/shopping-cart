#!/bin/bash

cat scripts/seed.sql | docker exec -i shopping-cart-db /usr/bin/mysql -u user --password=user shopping_cart
