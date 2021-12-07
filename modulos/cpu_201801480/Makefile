obj-m += cpu_201801480.o
all:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) 
clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(shell pwd) clean
