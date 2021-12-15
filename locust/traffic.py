from locust import HttpUser, task

class Traffic(HttpUser):
    @task
    def main(self):
        self.client.get("/")    