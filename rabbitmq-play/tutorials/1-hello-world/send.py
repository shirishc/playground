import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('172.21.0.2'))
channel = connection.channel()

channel.queue_declare(queue='hello')
channel.basic_publish(exchange='', routing_key='hello', body='Hello World')

print(" [x] sent 'Hello World!'")

channel.close()