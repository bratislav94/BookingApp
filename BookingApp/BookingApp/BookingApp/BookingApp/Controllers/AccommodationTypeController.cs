﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookingApp.Models;
using System.Web.Http.Description;
using System.Data.Entity.Infrastructure;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class AccommodationTypeController : ApiController
    {
        private BAContext db = new BAContext();

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("AccommodationType/{id}")]
        public IHttpActionResult Change(int id, AccommodationType type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != type.Id)
            {
                return BadRequest();
            }

            db.Entry(type).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeExist(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
                
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("AccommodationType")]
        public IHttpActionResult Add(AccommodationType type)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AccommodationsTypes.Add(type);
            db.SaveChanges();
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("AccommodationType/{id}")]
        public IHttpActionResult Delete(int id)
        {
            AccommodationType type = db.AccommodationsTypes.Find(id);

            if (type == null)
            {
                return NotFound();
            }

            db.AccommodationsTypes.Remove(type);
            db.SaveChanges();

            return Ok(type);
        }
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        private bool TypeExist(int id)
        {
            return db.AccommodationsTypes.Count(e => e.Id == id) > 0;
        }
        // DELETE api/<controller>/5
        //public void Delete(int id)
        //{
        //}
    }
}