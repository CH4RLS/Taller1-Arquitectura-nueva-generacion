# Taller1-Arquitectura-nueva-generacion
Experimentacion microservicios con docker, kubernetes y API


## Vagrant

Las pruebas de vagrant se realizaron sin problema para los tres ambientes.
se configuraron las 3 maquinas al tiempo rebajando a 1 giga de memoria en el broker por limitaciones de momeoria en PC.

### Configurar varias maquinas al tiempo:

Para configurar varias maquinas con un solo vagrant file se requiere dar una definciion a cada maquina.
```
config.vm.define "<vmName>" do |<vmName>|
  <snip>
end
```

## Microservicio Administra Proveedores

Servicio adminsitrador de proveedores con datos basicos.

### Empezando con Kubernetes

Cuando se inicia kubeadm se setea la variable cidr para flannel con el fin de tener conexion por cni entre master y worker.

```
kubeadm init --apiserver-advertise-address=192.168.50.3 --pod-network-cidr=10.244.0.0/16
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/v0.9.1/Documentation/kube-flannel.yml
root@master:/home/vagrant# kubectl get nodes
NAME      STATUS    ROLES     AGE       VERSION
master    Ready     master    13m       v1.9.3
```
### And coding style tests
Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
