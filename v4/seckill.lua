local vals = redis.call("HMGET", KEYS[1], "stock")
local stock = tonumber(vals[1])
if not stock then
    return 0
end
if stock > 0 then
    redis.call("HINCRBY", KEYS[1], "stock", -1)
    return 1
end
return 0
