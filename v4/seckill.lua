local vals = redis.call("HMGET", KEYS[1], "stock", "booked")
local stock = tonumber(vals[1])
local booked = tonumber(vals[2])
if not stock or not booked then
    return 0
end
if booked < stock then
    redis.call("HINCRBY", KEYS[1], "booked", 1)
    return 1
end
return 0
