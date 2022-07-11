import { Post } from "../xhr";

export function register(path, requestData){
  return Post(path, requestData);
}